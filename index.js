const express = require('express');
const http = require('http');
const path = require("path");
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const { log } = require('console');
const port = 3000;

//create app
const app = express()
app.use('/app',express.static(path.join('../app')))
app.use('/public',express.static(path.join('../public')))

// always code for body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

//middlewares
// app.use(helmet());
// app.use(limiter);


//register view-engine
app.set("view engine", "ejs");
// app.set('views','myfolder')
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
  //NOT: res.send(, sendFile();
  // res.sendFile(path.join(__dirname, '/index.html'));
  console.log(`Inside / route ${port}`);
  res.render('index');
})

app.post('/resume', (req, res) => {
    console.log(`Inside post resume route ${port}`);
    console.log(req.body);
  res.render('success');
})

// PRV INETEB LINE 1
// LINE 2 BDHFBDS HKFBDHFBDHBFHHADHFBDHKFVDSHKFVHKSDVFHK SDVHFVSDHFVDSHVFHDS

// past rpoj line 1
// line 2 sbfhdsbfhsdbfhsdfh dsjf dshfbdhf sdhfbdshfbsdjf dfbslfjlsdbfjk
app.listen(port, () => {
    console.log(`Server running  on ${port}`)
});