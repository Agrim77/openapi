import dotenv from 'dotenv';
import express, { response } from 'express';
import http from 'http';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import * as model from './chatgpt_M.js';
import nodemailer from 'nodemailer';
dotenv.config();
// import "dotenv/config"; // loads variables from .env file
import * as paypal from "./paypal_api.js";
import * as pdf_gen from './pdfGen.js'
import { log } from 'console';
const port = process.env.PORT;
const app = express();
const {CLIENT_ID, APP_SECRET, NODE_ENV} = process.env;

import { Country, State, City }  from 'country-state-city';

// app.use('/app',express.static(path.join('../app')))
// app.use('/public',express.static(path.join('../public')))
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// always code for body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const isDev = NODE_ENV === "dev";

const limiter = isDev 
? (req,res, next) => next() 
: rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});
let net_result = [];
let concatenatedArray = [];
let jd, cv;
let count = 1;
let flag_2 = false, flag_3 = false;
let result1 = {}, result2 = {}, result3 = {};

//middlewares
// app.use(helmet());
app.use(limiter);

//register view-engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

let pay_flag = false;

/*-------ROutes------------*/
app.get("/", (req, res) => {
  log(`Inside / route ${port}`);
  res.render("index");
});

app.post("/my-server/create-paypal-order", async (req, res) => {
  log("Create-paypal-order POST route \n");
  try {
    const order = await paypal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).render('error',{"msg":err.message});
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  log("Capture order POST route \n");
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    pay_flag = true;
    res.json(captureData);
  } catch (err) {
    res.status(500).render('error',{error:err.message});
  }
});

//TODO: comment this route after going live
app.get("/resume", (req, res) => {
  log("\n ------Get route resume(FOR DEV PRODUCTION ONLY-- comment out)----- \n");
  const resume_get_result = model.convert();
  net_result.push(resume_get_result)
  log(net_result)
  res.render("success", {result:resume_get_result, CLIENT_ID});
});

app.get("/loader", (req, res) => {
  res.render("loader");
})


app.post("/resume", async (req, res) => {
  jd = req.body.jd;
  cv = req.body.cv;
  // log(jd, cv)
  model.model1(jd, cv, count)
    .then((result) => {
      result1 = result;
      net_result.push(result);
      log(net_result);
      concatenatedArray = [].concat(...net_result);
      res.render("success", {result: concatenatedArray, CLIENT_ID});
    })
    .catch((error) => {
      log(error);
      res.render("error");
    });
});

app.get('/cities/:countryCode', (req, res) => {
  const countryCode = req.params.countryCode;
  const cities = City.getCitiesOfCountry(countryCode);
  res.json(cities.map(city => city.name));
});
let countries = {};


app.post('/generate_pdf',async (req, res) => {
  log("---generate_pdf----")
  log(concatenatedArray)
  if(!flag_2)
  await model_call(jd, cv, 2);
  if(!flag_3)
  await model_call(jd, cv, 3);
  pdf_gen.createPDF(concatenatedArray, 'public/pdfs', 'q_and_a.pdf');
  const pdfPath = '/pdfs/q_and_a.pdf';
  res.json({ pdf_path: pdfPath });
});

async function model_call(jd, cv, count) {
  return new Promise((resolve, reject) => {
    model.model1(jd, cv, count)
      .then((result) => {
        log("\n---------In app.js model1 promise--------\n");
        if(count === 2){
          result2 = result;
          flag_2 = true;
        } else if(count === 3){
          result3 = result;
          flag_3 = true;
        }
        
        net_result.push(result);
        // concatenatedArray = [].concat(...net_result);
        log(net_result);
        resolve();
      })
      .catch((error) => {
        log(error);
        reject(error);
      });
  });
}

app.get("/thanks", async (req, res) => {
  countries = Country.getAllCountries();
  log("-------thanks loaded: net result of all outputs----");

  // if(!flag_2)
  // await model_call(jd, cv, 2);
  // flag_2 = true;
  // if(!flag_3)
  // await model_call(jd, cv, 3);
  // flag_3 = true;



  // log(req.query);
  // const page = req.query.page;
  //   log(page);
  //   let startIndex, endIndex;
  //   let thanks_result = {};
  //   if (page === '1') {
  //     thanks_result = result1;
  //     startIndex = 0;
  //     endIndex = 14;
  //     concatenatedArray = [].concat(...net_result);
  //   } else if (page === '2') {
  //     startIndex = 15;
  //     endIndex = 29;
  //     if (!flag_2 && concatenatedArray.length < 30) {
  //       await model_call(jd, cv, 2);
  //       flag_2 = true;
  //     }
  //     thanks_result = result2;
  //   } else if (page === '3') {
  //       if (flag_3 && concatenatedArray.length < 50) {
  //       await model_call(jd, cv, 3);
  //       flag_3 = true;
  //     }
  //     thanks_result = result3;
  //     startIndex = 30;
  //     endIndex = concatenatedArray.length - 1;
  //   }

    const resume_get_result = model.convert();
    net_result.push(resume_get_result)

    // log("----concatenated array now---")
    concatenatedArray = [].concat(...net_result);
    // log(concatenatedArray);
    
    

    res.render("thanks", { result: concatenatedArray, isThanksPage: true, countries});
  // } else {
  //   res.render("error", { "msg": "First make the payment" });
  // }
});

app.get("/user-profile", (req, res) =>{
  res.render("user-profile");
})
app.get("/user-profile", (req, res) =>{
  res.render("user-profile");
})
app.get("/auth-update", (req, res) =>{
  res.render("auth-update");
})
app.get("/user-profile", (req, res) =>{
  res.render("user-profile");
})
app.get("/user-profile", (req, res) =>{
  res.render("user-profile");
})
app.get("/user-profile", (req, res) =>{
  res.render("user-profile");
})
app.get("/user-profile", (req, res) =>{
  res.render("user-profile");
})


app.get("/super-admin", (req,res) => {
  res.render("super-admin");
})



app.post('/send-email', (req, res) => {
  const { user_name, user_email } = req.body;
  log(req.body)
  //, user_phone, user_country, user_city
  // , user_phone, user_country, user_city
  log(user_name, user_email);
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });

  // Construct the email message
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: `${user_email}`,
    subject: 'Your PDF File',
    text: `Dear ${user_name},\n\nPlease find the attached PDF file.\n\nBest regards,\n  InterviewHacks.HQ`,
    attachments: [
      {
        filename: 'q_and_a.pdf',
        path: path.join('public', 'pdfs', 'q_and_a.pdf'),
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // res.status(500).send('Error sending email');
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  log(`Server running  on ${port}`);
});
