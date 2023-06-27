import { Configuration, OpenAIApi } from "openai";
// import readlineSync from "readline-sync";
import dotenv from "dotenv";
dotenv.config();
import { log } from "console";
import * as pdf_gen from './pdfGen.js'
//---FOR TEST PURPOSE---
// model1(jd, cv)
// convert();

export function qs_as_format(inputText){
  log("\n----Converting to proper question & answer format-------\n")
  const lines = inputText.split("\n");
  const formattedLines = lines.map((line) => {
    if (line.trim().startsWith("Question") || line.trim().startsWith("Answer")) {
      const parts = line.split(":");
      if (parts.length === 2) {
        const number = parts[0].trim().replace(/\D/g, "");
        const text = parts[1].trim();
        return `${parts[0].trim()} : ${text.trim()}`; // Add space on both sides of the colon
      }
    }
    return line;
  });
  const formattedText = formattedLines.join("\n");
  // log(formattedText);
  return formattedText;
}

function htmlEntity(inputText){
  log("\n ----- Now converting the code part of answers to HTML ENTITITES ----- \n");
  let regex = /[&<>"'\/\\]/g;
  let htmlString = inputText.replace(regex, function(match) {
  if (match === "&") {
    return "&amp;";
  } else if (match === "<") {
    return "&lt;";
  } else if (match === ">") {
    return "&gt;";
  } else if (match === '"') {
    return "&quot;";
  } else if (match === "'") {
    return "&apos;";
  } else if (match === "/") {
    return "&#x2F;";
  } else if (match === "\\") {
    return "&#92;";
  }
});

// log(htmlString);
return htmlString;

}

export function json_format(inputText){
  log("\n ----- Now converting to proper JSON format for EJS rendering -----\n");
  // Define the regular expressions for matching questions and answers
  const questionRegex = /Question (\d+) : (.*?)(?=\nAnswer \d+ :|$)/gs;
  const answerRegex = /Answer \d+ : (.*?)(?=\nQuestion \d+ :|$)/gs;
  let match;
  const result = [];
  
  // Extract questions
  while ((match = questionRegex.exec(inputText)) !== null) {
    const question = match[2].trim();
    result.push({ ques: question, ans: "" });
  }
  
  // Extract answers and assign them to corresponding questions
  let resultIndex = 0;
  while ((match = answerRegex.exec(inputText)) !== null) {
    const answer = match[1].trim();
    result[resultIndex].ans = answer;
    resultIndex++;
  }
  // log(result);
  return result;
}

//----------FUnction for pdf gen-------
function for_pdf(formattedLines){
  log('-------COnverting for pdf gen object------\n')
  const pdf_result = json_format(formattedLines);
  log(pdf_result);
  pdf_gen.createPDF(pdf_result, 'public/pdfs', 'q_and_a.pdf');
}
const questions = [];
export function convert(completionText) {

    var inputText2 = `Question 1: Can you explain the process of building data and logic-driven web-based workflow systems using bubble.io?
  Answer 1: Building data and logic-driven web-based workflow systems using bubble.io involves creating user interfaces using bubble's visual editor, setting up
  database structures and workflows, and defining the logic behind the workflows using bubble's built-in tools. Custom coding might be required if the built-in tools are not enough to meet the requirements.

  Question 2: What projects have you worked on in the past with custom coding?
  Answer 2: In the CV, the candidate has mentioned working on the DISTORT, MATCHER, and ALL_CRYPTO projects with custom coding. The DISTORT project is a Discord import ReactDOM from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Layout from "./pages/Layout";
  import Home from "./pages/Home";
  import Blogs from "./pages/Blogs";
  import Contact from "./pages/Contact";
  import NoPage from "./pages/NoPage";

  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);

  Question 3:How do you typically go about debugging and testing your code?
  Answer 3:Debugging and testing code involve using various developer tools, such as React Developer Tools for frontend debugging, and Google Chrome Developer Tools for checking API calls and error handling. Backend debugging might involve using a tool like Postman to test API endpoints. Unit testing frameworks like Jest or Mocha can also be used to test individual functions or components.

  Question 4 :What is your approach to documenting a project?
  Answer 4 :Documenting a project starts with writing clear and concise code comments that explain the functionality of the code segments. In addition, creating
  a comprehensive readme file that details the project's requirements, technologies, installation process, and usage guidelines is crucial. Also, using tools like JSDoc or ApiDoc for generating API documentation, and documenting any custom configurations or settings unique to the project, is essential.

  Question 5 : Can you list the different data sources, SDKs, and APIs you have experience working with?
  Answer 5 : In the CV, the candidate has mentioned working with Firebase, Axios, and Heroku for backend-frontend connections and environment-variable protection. They have also likely worked with other data sources, SDKs, and APIs in their past projects, but specific examples are not provided.

  Question 6 : How do you demonstrate your strong analytical skills in your work?
  Answer 6 : Strong analytical skills can be demonstrated by efficiently analyzing project requirements, breaking complex problems down into manageable tasks, and using algorithms and data structures to optimize code performance. Additionally, these skills can be showcased by continuously seeking to improve the project deliverables while maintaining high code quality and adhering to deadlines.

  Question 7 : What is your experience with HTML/CSS and frontend frameworks like React?
  Answer 7 : The candidate's CV mentions experience in developing web applications using HTML, CSS, and JavaScript, along with frontend frameworks like ReactJs. Moreover, they have used React components, and state management libraries such as Redux, and additional libraries like Tailwind CSS.
  
  Question 8 : What is Axios and how is it used in a React project?
  Answer 8 : Axios is a popular JavaScript library for making HTTP requests from the client to the server. In a React project, Axios is used to fetch data from APIs and send data back to the server. It provides a more flexible, easy-to-use interface than the built-in JavaScript fetch method and handles XMLHttpRequests, making it compatible with older browsers.

  Question 9 : How do you implement authentication using Google Auth in a project?
  Answer 9 : To implement authentication using Google Auth, you can use the Google APIs Client Library or a popular library like Firebase Authentication. You'll need to register your project on the Google API Console, obtain OAuth 2.0 client credentials, and include the appropriate SDKs or libraries in your project. Once set up, users can sign in with their Google accounts, granting access to their profile information and enabling you to integrate authentication seamlessly in your application.

  Question 10 : What are the main differences between SQL and NoSQL databases?
  Answer 10 : SQL databases are relational and use structured query language (SQL) for managing and querying data. They operate on predefined schema, have strict
  relationships between tables, and usually follow the ACID properties. NoSQL databases, on the other hand, are non-relational and can store unstructured and semi-structured data. They don't follow a fixed schema and offer more flexibility in data storage and retrieval. Examples of NoSQL databases include MongoDB, Couchbase, and Cassandra.

  Question 11 : What is the role of React Router in a React application?
  Answer 11 : React Router is a powerful routing library used to handle client-side navigation between different views or components in a React application. It allows developers to define routes and associate them with specific components, controlling which components are rendered based on the current route in the application. This provides a dynamic, SPA (Single Page Application) experience for users.

  Question 12 : Explain the concept of a virtual DOM in React.
  Answer 12 : The virtual DOM is a lightweight, in-memory representation of the actual DOM used by React to optimize component rendering. When a component's state changes, React generates a new virtual DOM and performs a diffing algorithm to determine the minimal set of changes required to update the actual DOM. This process is called reconciliation, and it makes React applications render updates more efficiently and performantly.`;
  var inputText = completionText;
  if (!completionText) {
    inputText = inputText2;
  }
  const formattedLines = qs_as_format(inputText);
  //for pdf gen
  for_pdf(formattedLines);
  
  inputText =htmlEntity(formattedLines);
  return json_format(inputText);
}


export async function model1(jd, cv) {
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, List out the 10 Questions & answers to most important coding questions.
  IMPORTANT: The output format should be as follows:

  "Question 1 <Space> : <space> What is meaning of React 
  Answer 1 <Space> : <Space> React means a framework"

  Questions can include implementation, algorithm code, how to use the technology mentioned in JD to solve a problem. 
  Include code in answers, and explain the code in layman's terms.
  If candidates CV does not have the answer to question asked, provide an answer. \n
  Here is the JD :\n ${jd} \n  Here is the CV of candidate :\n ${cv}.  `;
  const prompt2 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, List out the 20 Questions & answers,according to JD and CV earlier provided. Assess the candidate's knowledge and understanding related to the provided Job Description and CV.
  If candidates CV does not have the answer to question asked, provide an answer to the concept or technology asked.
  IMPORTANT: The format should be as follows
  Question 1 <Space> : <Space> Question generated
  Answer 1 <Space> : <Space> Answer generated
  

  Here is the JD :\n ${jd} \n  Here is the CV :\n ${cv}.`;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  var count = 1;

  const history = [];
  while (true) {
    log(`------ Running prompt ${count} ------`);
    
    var user_input = prompt1;
    if (count == 2) user_input = prompt2;
    count++;
    log(user_input + "\n");
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
        temperature:0.6,
      });

      const completion_text = completion.data.choices[0].message.content;
      log(completion_text);
      

      history.push([user_input, completion_text]);
      // log('------TIme-----')
      // console.timeEnd('model1exe');
      return convert(completion_text);
      // break;
      // return;
      // const user_input_again = readlineSync.question(
      //   "\nWould you like to continue the conversation? (Y/N)"
      // );
      // if (user_input_again.toUpperCase() === "N") {
      //   return;
      // } else if (user_input_again.toUpperCase() !== "Y") {
      //   log("Invalid input. Please enter 'Y' or 'N'.");
      //   return;
      // }
    } catch (error) {
      if (error.response) {
        log(error.response.status);
        log(error.response.data);
      } else {
        log(error.message);
      }
    }
  }
}

