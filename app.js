import dotenv from 'dotenv';
import express from 'express';
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
const {CLIENT_ID, APP_SECRET} = process.env;

// app.use('/app',express.static(path.join('../app')))
// app.use('/public',express.static(path.join('../public')))
app.use(express.static("public"));
app.use(express.json());
// always code for body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

//middlewares
// app.use(helmet());
app.use(limiter);

//register view-engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

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
    res.status(500).render('error',{error:err.message});
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  log("Capture order POST route \n");
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).render('error',{error:err.message});
  }
});

//TODO: comment this route after going live
app.get("/resume", (req, res) => {
  log("\n ------Get route resume(FOR DEV PRODUCTION ONLY-- comment out)----- \n");
  const result = model.convert();
  log(result);
  res.render("success", {result, CLIENT_ID});
});

app.get("/loader", (req, res) => {
  res.render("loader");
})

app.post("/resume", async (req, res) => {
  // res.render("loader");
  const exp = req.body.exp;
  const proj = req.body.proj;
  const skills = req.body.skills;
  const jd = req.body.jd;
  const ach = req.body.ach;
  const cv = `
    Past Experience:  
    ${exp} \n
    and personal projects : 
    ${proj} \n
    and Skills:
    ${skills} \n
    Achievements:
    ${ach} `;

  model.model1(jd, cv)
    .then((result) => {
      log("\n---------In app.js model1 promise--------\n");
      log(result);
      res.render("success", {result: result, CLIENT_ID});
    })
    .catch((error) => {
      log(error);
      res.render("error");
    });
});

app.get("/thanks", (req, res) => {
    res.render("thanks");
})

app.post('/send-email', (req, res) => {
  const { user_name, user_email, user_phone } = req.body;
  log(user_name, user_email, user_phone);
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
  });
  // let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'merlin.romaguera12@ethereal.email',
//         pass: 'MWVqaM1Cc5yzFyHtRw'
//     }
// });

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
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  log(`Server running  on ${port}`);
});
