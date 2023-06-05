const { log } = require("console");
const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

const jd = `Selected intern's day-to-day responsibilities include 1. Building data and logic-driven web-based workflow systems using bubble.io 2. Working with custom coding 3. Debugging and testing the code 4. Documenting and testing 5. Working with the different data sources, SDKs, and APIs Requirements: 1. Strong analytical skills 2. Excellent coding skills 3. A good foundation in algorithms and data structures 4. Exposure to any HTML/CSS/Node.js/React/MongoDB/Postgres/APIs etc. 5. Attention to detail 6. Passion for excellence 7. B. Tech/BE from good institutes 8. Above-average academic performance 9. Aspiring full-stack developer 10. Past experience in real-world and academic projects is preferred
`
const cv = `Past Experience: 
Company Name: Edioper+ Solutions I had experience developing web applications using various web stacks and technologies such as NodeJS and React, catering mostly to clients in the education sector. My skills include creating responsive full-stack websites from wireframes.
and personal projects :DISTORT: Discord UI clone project with real-time chat functionality and google Auth using firebase (for backend also), utilizing Redux for different channels and react components state management. MATCHER : Full-stack MERN project with Node, Express, and MongoDB (Mongoose) for backend and React for frontend. Deployed on Firebase with Axios for backend-frontend connection, and Heroku for environmental variable protection. Bugs resolved using React Developer tools. ALL_CRYPTO: Multipage responsive website showcasing cryptocurrencies and their details, news, in a user friendly graph and cards like fashion. Fixed switch to router (react router) and chartJs 'category') bug.
Skills: MongoDB, Express, ReactJs, Nodejs, html ,css , JavaScript,  Java, Data Structures and algorithms, React Redux, tailwind css, Authentication via google auth
Achievements: Leetcode DSA 300+ questions, Hackerrank SQL certified;`


// model1(jd, cv)


const questions = [];
const convert = (inpuText) => {
  const inputText = `Question 1 : What is React and why is it useful for building web applications?
Answer 1 : React is a JavaScript library for building user interfaces, primarily for single-page applications. It allows developers to create reusable UI components and manage the state of their applications more efficiently. Using React makes it easier to build and maintain complex UIs, improve performance, and create a more responsive user experience.

Question 2 : What is Node.js and how is it different from vanilla JavaScript?
Answer 2 : Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing developers to run JavaScript on the server-side. Node.js provides an event-driven, non-blocking I/O model, making it lightweight and efficient for building scalable network applications. Vanilla JavaScript refers to the core JavaScript language without any additional libraries or frameworks.    

Question 3 : Explain the concept of data structures and algorithms.
Answer 3 : Data structures are specialized formats for organizing, storing, and manipulating data. Examples include arrays, linked lists, trees, and graphs. Algorithms are step-by-step procedures for performing calculations, executing tasks, or solving problems. They are essential in computer programming, as they provide efficient methods for completing tasks and managing data within data structures.

Question 4 : How would you implement an algorithm to sort an array of numbers in ascending order?
Answer 4 : One simple example is the Bubble Sort algorithm. Here's an implementation in JavaScript:


This algorithm iterates through the array and compares adjacent elements, swapping them if they are in the wrong order. This process repeats until the array is sorted.

Question 5 : How do you handle routing in a React application?
Answer 5 : React Router is a popular library for handling routing in React applications. It allows developers to define routes and render components based on the current URL. Here's an example of how to use React Router:

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

In this example, the Router component wraps the entire application, and the Switch component is used to define specific routes and render the appropriate component based on the URL.

Question 6 : What is MongoDB and how does it differ from relational databases?
Answer 6 : MongoDB is a document-based NoSQL database that stores data in flexible, JSON-like BSON documents. Unlike relational databases, which store data in tables, MongoDB uses a more flexible and schema-less approach, allowing developers to store data without needing to define a strict structure beforehand. This can make it easier to work with and scale for certain types of applications.


]
`
  console.log("\n --- Now converting to JSON --");
  const regex = /Question (\d+) : (.+?)\n\s+Answer \d+ : (.+?)(?=\n\s+Question|$)/gs;
const result = [];
let match;

while ((match = regex.exec(inputText))) {
  const [, questionNum, questionText, answerText] = match;
  result.push({ ques: questionText.trim().replace(/\n/g, '<br>'), ans: answerText.trim().replace(/\n/g, '<br>') });
}

console.log(result);
return result;
  // const regex = /Question (\d+) : (.+?)\n\s+Answer \d+ : (.+?)(?=\n\s+Question|$)/gs;
  // const result = [];
  // let match;
  
  // while ((match = regex.exec(inputText))) {
  //   const [, questionNum, questionText, answerText] = match;
  //   result.push({ ques: questionText.trim(), ans: answerText.trim() });
  // }
  
  // console.log(result);

// return questions;
}

convert();
async function model1(jd, cv){
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, please list out the Questions & answers to 15 most important coding questions. Print questions & answers in with space between them.
  The output format should be as follows:
  "Question 1 : What is meaning of React
  Answer 1 : React means a framework"
  and don't include any backticks in output
  Questions can include implementation, algorithm code, how to use the technology mentioned in JD to solve a problem. Include code in answers, and explain the code in layman's terms \n
  Here is the JD :\n ${jd} \n  Here is the CV :\n ${cv}.  `;
  const prompt2 = `Generate 20 concept-based questions & answers to according to JD and CV earlier provided assess the candidate's knowledge and understanding related to the provided Job Description and CV.
  The format should be as follows
  Question 1: Question generated
  Answer 1: ANswer generated
  
  Question 2: Question generated
  Answer 2: Answer Generated`

  // console.log(prompt1 +'\n');
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  var count = 1;

  const history = [];
  
  while (true) {
    console.log("\n Count:"+count);
    var user_input = prompt1;
    if(count == 2)user_input = prompt2;
    count++;
    console.log(user_input+"\n");
    // const user_input = readlineSync.question("Your input: ");
    

    const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: user_input });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      history.push([user_input, completion_text]);
      return convert(completion_text);
      // break;
      // return;
      // const user_input_again = readlineSync.question(
      //   "\nWould you like to continue the conversation? (Y/N)"
      // );
      // if (user_input_again.toUpperCase() === "N") {
      //   return;
      // } else if (user_input_again.toUpperCase() !== "Y") {
      //   console.log("Invalid input. Please enter 'Y' or 'N'.");
      //   return;
      // }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
};

module.exports = model1;
module.exports = convert;