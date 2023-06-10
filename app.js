const express = require("express");
const http = require("http");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const port = 8000 || process.env.PORT;
const ejs = require('ejs')
const model = require("./chatgpt_M.js");
// const convert = require("./chatgpt_M.js");
const paypal = require("./paypal_api.js");
const { log } = require("console");

const app = express();
require('dotenv').config();
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
// app.set('views','myfolder')
app.use(express.urlencoded({ extended: false }));



app.get("/", (req, res) => {
  //NOT: res.send(, sendFile();
  // res.sendFile(path.join(__dirname, '/index.html'));
  console.log(`Inside / route ${port}`);
  res.render("index");
});

app.get("/checkout", (req,res) => {
  
  res.render('checkout' , { CLIENT_ID});
});

app.post("/my-server/create-paypal-order", async (req, res) => {
  try {
    const order = await paypal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).render('error',{error:err.message});
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).render('error',{error:err.message});
  }
});

//comment this route after going live
app.get("/resume", (req, res) => {
  console.log("\n ------Get route resume(FOR DEV PRODUCTION ONLY)----- \n");
  const result = model.convert();
  // const result = [
  //   {
  //     "Question 1":"WABABABDBFHBBHB fdbfkdsbfksjb",
  //     "Answer 1":"fdnfsdjnfljsnfl"
  //   },
  //   {
  //     "Question 2":"WABABABDBFHBBHB fdbfkdsbfksjb",
  //     "Answer 2":"fdnfsdjnfljsnfl"
  //   },{
  //     "Question 3":"WABABABDBFHBBHB fdbfkdsbfksjb",
  //     "Answer 3":"fdnfsdjnfljsnfl"
  //   },
  // ]
  res.render("success", {result: result});
});

app.post("/resume", async (req, res) => {
  res.render("loader");
  const exp = req.body.exp;
  const proj = req.body.proj;
  const skills = req.body.skills;
  const jd = req.body.jd;
  const ach = req.body.ach;
  // console.log(`Experince: ${exp} \n Projects: ${proj}`);
  const cv = `
    Past Experience:  
    ${exp} \n
    and personal projects : 
    ${proj} \n
    and Skills:
    ${skills} \n
    Achievements:
    ${ach} `;
  // console.log(`${cv} \n`);

  model.model1(jd, cv)
    .then((result) => {
      console.log("\n---------In app.js model1 promise--------\n");
      console.log(result);
      res.render("success", {result: result});
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

app.listen(port, () => {
  console.log(`Server running  on ${port}`);
});
