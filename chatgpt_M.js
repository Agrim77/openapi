const { log } = require("console");
const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();



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
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, please list out the Questions (printed as Question <Space> Number:) & answers(printed as Answer <Space> Number:) to 10 most important coding questions. 
  Questions can include implementation, algorithm code, how to use the technology mentioned in JD to solve a problem. Include code in answers, and explain the code in layman's terms \n
  Here is the JD :\n ${jd} \n  Here is the CV :\n ${cv}.  `;
  const prompt2 = `Generate 20 concept-based answers to the below questions assess the candidate's knowledge and understanding related to the provided Job Description and CV.`

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