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

model1(jd, cv)

const questions = [];
const convert = (inputText) => {
  console.log("\n --- Now converting to JSON --");
  const questionPattern = /Question (\d+): (.+)(?:\n\s+Answer \d+: (.+))?/g;

let match;
while ((match = questionPattern.exec(inputText)) !== null) {
  const questionNumber = match[1];
  const question = match[2].trim();
  const answer = match[3] ? match[3].trim() : '';
  questions.push({
    [`Question ${questionNumber}`]: question,
    [`Answer ${questionNumber}`]: answer,
  });
}

// console.log(questions);
return questions;
}


async function model1(jd, cv){
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, please list out the Questions & answers to 15 most important coding questions. Print questions & answers in with space between them.
  The format should be as follows
  Question 1 : Question generated
  Answer 1 : ANswer generated
  
  Question 2: Question generated
  Answer 2: Answer Generated

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
  
  while (count < 3) {
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