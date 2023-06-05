const express = require("express");
const http = require("http");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const { log } = require("console");
const port = 3000;
// const ejs = require('ejs')
const model1 = require("./chatgpt_M.js");
const convert = require("./chatgpt_M.js");

//create app
const app = express();
// app.use('/app',express.static(path.join('../app')))
// app.use('/public',express.static(path.join('../public')))
app.use(express.static("public"));

// always code for body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//middlewares
app.use(helmet());
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

app.get("/resume", (req, res) => {
  console.log("get route resume");
  const result = convert();
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
  console.log(result);
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

  model1(jd, cv)
    .then((result) => {
      console.log("\n---------In app.js----\n");
      console.log(result);
      res.render("success", {result: result});
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

// PRV INETEB LINE 1
// LINE 2 BDHFBDS HKFBDHFBDHBFHHADHFBDHKFVDSHKFVHKSDVFHK SDVHFVSDHFVDSHVFHDS

// past rpoj line 1
// line 2 sbfhdsbfhsdbfhsdfh dsjf dshfbdhf sdhfbdshfbsdjf dfbslfjlsdbfjk
app.listen(port, () => {
  console.log(`Server running  on ${port}`);
});
