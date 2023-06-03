const { log } = require("console");
const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

// const jd = "Selected intern's day-to-day responsibilities include 1. Building data and logic-driven web-based workflow systems using bubble.io 2. Working with custom coding 3. Debugging and testing the code 4. Documenting and testing 5. Working with the different data sources, SDKs, and APIs Requirements: 1. Strong analytical skills 2. Excellent coding skills 3. A good foundation in algorithms and data structures 4. Exposure to any HTML/CSS/Node.js/React/MongoDB/Postgres/APIs etc. 5. Attention to detail 6. Passion for excellence 7. B. Tech/BE from good institutes 8. Above-average academic performance 9. Aspiring full-stack developer 10. Past experience in real-world and academic projects is preferred";

// const exp = "Company Name: Edioper+ Solutions I had experience developing web applications using various web stacks and technologies such as NodeJS and React, catering mostly to clients in the education sector. My skills include creating responsive full-stack websites from wireframes.";

// const proj = "DISTORT: vDiscord UI clone project with real-time chat functionality and google Auth using firebase (for backend also), utilizing Redux for different channels and react components state management. MATCHER : Full-stack MERN project with Node, Express, and MongoDB (Mongoose) for backend and React for frontend. Deployed on Firebase with Axios for backend-frontend connection, and Heroku for environmental variable protection. Bugs resolved using React Developer tools. ALL_CRYPTO: Multipage responsive website showcasing cryptocurrencies and their details, news, in a user friendly graph and cards like fashion. Fixed switch to router (react router) and chartJs 'category') bug.";

// const cv = "Past Experience: "+ exp + "and personal projects :"+ proj;

// model1(cv, jd);

async function model1(jd, cv){
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, please list out the questions and answers to 15 most important coding questions that are most likely to be asked during the interview.

  Questions:
  1. Write a detailed code example to demonstrate how you would implement [specific skill/requirement mentioned in the JD].
  2. Explain the steps involved in solving [specific problem/task mentioned in the JD], and provide a code snippet to demonstrate the solution.
  3. Describe a scenario where you have used [technology/tool mentioned in the JD] in a coding project. Provide a code example to illustrate its usage.
  4. Write a function that takes [specific inputs mentioned in the JD], performs [specific operation mentioned in the JD], and returns [desired output mentioned in the JD]. Explain the approach and provide the code.
  5. How would you handle [specific challenge mentioned in the JD] while working on a coding project? Provide an example code snippet to demonstrate your solution.
  6. Explain the concept of [specific concept/technology mentioned in the JD] and provide an example where it can be applied in a coding scenario.
  7. Implement a [specific algorithm/data structure mentioned in the JD] and explain its time and space complexity. Provide a code example to illustrate its usage.
  8. Describe a coding project where you have optimized the performance of a particular component. Explain the techniques and strategies you used and provide relevant code snippets.
  9. Write a detailed explanation of [specific programming language/framework mentioned in the JD] and provide an example code snippet showcasing its key features.
  10. Discuss the pros and cons of [specific technology/tool mentioned in the JD] in the context of a coding project. Provide code examples to support your arguments.
  Here is the  : ${jd}  Here is the CV : ${cv}.  `;

  // 11. Explain the difference between [specific programming concept/terminology mentioned in the JD] and [related concept/terminology mentioned in the JD]. Provide code examples to highlight the distinctions.
  // 12. Describe a scenario where you have worked with [specific API/library mentioned in the JD]. Provide a code example that demonstrates the usage of the API/library.
  // 13. Write a detailed explanation of [specific design pattern mentioned in the JD]. Provide a code example showcasing the implementation of the design pattern in a coding scenario.
  // 14. How would you handle [specific error/scenario mentioned in the JD] in a coding project? Provide an example code snippet that demonstrates your approach to handling the situation.
  // 15. Describe a situation where you have collaborated with a team to develop a coding project. Explain the tools, processes, and communication methods you used to ensure successful collaboration. Provide code snippets to showcase the collaborative development.
  const prompt2 = `Generate 20 concept-based questions and answers to assess the candidate's knowledge and understanding related to the provided Job Description and CV.
  
  Concept Questions:
  1. Explain the concept of [specific technology/tool mentioned in the JD] and its role in [relevant task/requirement mentioned in the JD].
  2. Describe the key components and architecture of [specific system/platform mentioned in the JD].
  3. What are the main principles and best practices for [specific programming language mentioned in the JD] development?
  4. Explain the concept of [specific concept/terminology mentioned in the JD] and provide an example of its usage in a coding scenario.
  5. Describe the process of [specific process mentioned in the JD], including the steps involved and any relevant tools or methodologies.
  6. Explain the concept of [specific design pattern mentioned in the JD] and provide an example of how it can be applied in software development.
  7. Describe the difference between [specific technology/term mentioned in the JD] and [related technology/term mentioned in the JD].
  8. What are the benefits and drawbacks of using [specific technology/tool mentioned in the JD] in a coding project? Provide examples to support your answer.
  9. Explain the concept of [specific algorithm/data structure mentioned in the JD] and provide an example of its usage in a coding scenario.
  10. How would you approach [specific challenge mentioned in the JD] using [relevant technology/tool mentioned in the JD]? Provide an example.
  11. Describe the concept of [specific concept/technology mentioned in the JD] and its significance in [relevant task/requirement mentioned in the JD].
  12. Explain the role of [specific role/position mentioned in the JD] in a software development team and the skills required for that role.
  13. Describe a scenario from your past experience where you have utilized [specific skill/technology mentioned in the JD] to solve a complex problem.
  14. What are the main considerations for ensuring the security and data privacy of a software system? Explain with examples.
  15. Explain the concept of [specific concept/terminology mentioned in the JD] and its importance in the context of [relevant task/requirement mentioned in the JD].
  16. Describe the process of testing and quality assurance in software development, including the different types of testing and their purpose.
  17. Explain the concept of [specific concept/technology mentioned in the JD] and how it can improve the performance and scalability of a software system.
  18. What are the key steps involved in deploying a software application to a production environment? Describe the deployment process.
  19. Describe your experience with [specific technology/tool mentioned in the CV] and how it has contributed to your previous projects.
  20. Explain the concept of [specific concept/technology mentioned in the CV] and its relevance to the requirements of the JD.`

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