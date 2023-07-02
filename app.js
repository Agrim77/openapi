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
  log(jd, cv)
  model.model1(jd, cv, count)
    .then((result) => {
      net_result.push(result);
      log("NET RESULT\n");
      log(net_result);
      res.render("success", {result: result, CLIENT_ID});
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

async function model_call(jd, cv, count) {
  return new Promise((resolve, reject) => {
    model.model1(jd, cv, count)
      .then((result) => {
        log("\n---------In app.js model1 promise--------\n");
        net_result.push(result);
        concatenatedArray = [].concat(...net_result);
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
  log(req.query);
  const page = req.query.page;
    log(page);
    let startIndex, endIndex;
    if (page === '1') {
      log("pagination 1");
      startIndex = 0;
      endIndex = 14;
      concatenatedArray = [].concat(...net_result);
    } else if (page === '2') {
      log("pagination 2");
      startIndex = 15;
      endIndex = 29;
      if (concatenatedArray.length < 30) {
        await model_call(jd, cv, 2);
        // !flag_2 && 
        flag_2 = true;
      }
    } else if (page === '3') {
      log("pagination 3");
      if (concatenatedArray.length < 50) {
        await model_call(jd, cv, 3);
        // !flag_3 && 
        flag_3 = true;
      }
      startIndex = 30;
      endIndex = concatenatedArray.length - 1;
    }

    log(concatenatedArray);
    let thanks_result = concatenatedArray.slice(startIndex, endIndex + 1);

    res.render("thanks", { result: thanks_result, isThanksPage: true, countries, count, page });
  // } else {
  //   res.render("error", { "msg": "First make the payment" });
  // }
});




app.post('/send-email', (req, res) => {
  const { user_name, user_email, user_phone, user_country, user_city } = req.body;
  log(user_name, user_email, user_phone, user_country, user_city);
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
