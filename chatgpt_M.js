const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

// var sqlite3 = require('sqlite3').verbose();

// const jd = "Selected intern's day-to-day responsibilities include 1. Building data and logic-driven web-based workflow systems using bubble.io 2. Working with custom coding 3. Debugging and testing the code 4. Documenting and testing 5. Working with the different data sources, SDKs, and APIs Requirements: 1. Strong analytical skills 2. Excellent coding skills 3. A good foundation in algorithms and data structures 4. Exposure to any HTML/CSS/Node.js/React/MongoDB/Postgres/APIs etc. 5. Attention to detail 6. Passion for excellence 7. B. Tech/BE from good institutes 8. Above-average academic performance 9. Aspiring full-stack developer 10. Past experience in real-world and academic projects is preferred";

// const exp = "Company Name: Edioper+ Solutions I had experience developing web applications using various web stacks and technologies such as NodeJS and React, catering mostly to clients in the education sector. My skills include creating responsive full-stack websites from wireframes.";

// const proj = "DISTORT: vDiscord UI clone project with real-time chat functionality and google Auth using firebase (for backend also), utilizing Redux for different channels and react components state management. MATCHER : Full-stack MERN project with Node, Express, and MongoDB (Mongoose) for backend and React for frontend. Deployed on Firebase with Axios for backend-frontend connection, and Heroku for environmental variable protection. Bugs resolved using React Developer tools. ALL_CRYPTO: Multipage responsive website showcasing cryptocurrencies and their details, news, in a user friendly graph and cards like fashion. Fixed switch to router (react router) and chartJs 'category') bug.";

// const cv = "Past Experience: "+ exp + "and personal projects :"+ proj;

// model1(cv, jd);

async function model1(jd, cv){
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, please list out the questions and answers to 50 most important questions that are most likely to be asked during the interview. Here is the  : ${jd}  Here is the CV : ${cv}. Explain answers in layman' term, provide code examples also. `;

  console.log(prompt1);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const history = [];

  while (true) {

    
    const user_input = readlineSync.question("Your input: ");

    // const user_input = prompt1;

    const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: user_input });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      history.push([user_input, completion_text]);

      const user_input_again = readlineSync.question(
        "\nWould you like to continue the conversation? (Y/N)"
      );
      if (user_input_again.toUpperCase() === "N") {
        return;
      } else if (user_input_again.toUpperCase() !== "Y") {
        console.log("Invalid input. Please enter 'Y' or 'N'.");
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        return;
      } else {
        console.log(error.message);
        return;
      }
    }
  }
};

module.exports = {model1};