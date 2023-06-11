import { Configuration, OpenAIApi } from "openai";
// import readlineSync from "readline-sync";
import dotenv from "dotenv";
dotenv.config();
import { log } from "console";

const jd = `Selected intern's day-to-day responsibilities include 1. Building data and logic-driven web-based workflow systems using bubble.io 2. Working with custom coding 3. Debugging and testing the code 4. Documenting and testing 5. Working with the different data sources, SDKs, and APIs Requirements: 1. Strong analytical skills 2. Excellent coding skills 3. A good foundation in algorithms and data structures 4. Exposure to any HTML/CSS/Node.js/React/MongoDB/Postgres/APIs etc. 5. Attention to detail 6. Passion for excellence 7. B. Tech/BE from good institutes 8. Above-average academic performance 9. Aspiring full-stack developer 10. Past experience in real-world and academic projects is preferred
`;
const cv = `Past Experience: 
Company Name: Edioper+ Solutions I had experience developing web applications using various web stacks and technologies such as NodeJS and React, catering mostly to clients in the education sector. My skills include creating responsive full-stack websites from wireframes.
and personal projects :DISTORT: Discord UI clone project with real-time chat functionality and google Auth using firebase (for backend also), utilizing Redux for different channels and react components state management. MATCHER : Full-stack MERN project with Node, Express, and MongoDB (Mongoose) for backend and React for frontend. Deployed on Firebase with Axios for backend-frontend connection, and Heroku for environmental variable protection. Bugs resolved using React Developer tools. ALL_CRYPTO: Multipage responsive website showcasing cryptocurrencies and their details, news, in a user friendly graph and cards like fashion. Fixed switch to router (react router) and chartJs 'category') bug.
Skills: MongoDB, Express, ReactJs, Nodejs, html ,css , JavaScript,  Java, Data Structures and algorithms, React Redux, tailwind css, Authentication via google auth
Achievements: Leetcode DSA 300+ questions, Hackerrank SQL certified;`;

// model1(jd, cv)
convert();

const questions = [];
export async function convert(nputText) {
  // const inputText = `Question 1 : What is Bubble.io and how is it used in building web-based systems?
  // Answer 1 : Bubble.io is a visual web development platform that lets you create web applications without writing traditional code. It provides a drag-and-drop interface to design and develop an app, and it generates the code for you automatically. In web-based systems, Bubble.io is used to create data-driven, logic-driven workflows that can be easily integrated with custom coding and APIs.

  // Question 2 : Explain what custom coding means in the context of the internship.
  // Answer 2 : Custom coding refers to writing, debugging, and testing code specifically tailored to the requirements of a particular project, as opposed to using pre-built or off-the-shelf solutions. In the context of this internship, it means implementing unique functionalities for the web-based workflow systems being developed using bubble.io and other technologies mentioned in the JD.

  // Question 3 : How can you use React in a project to improve the user interface and performance?
  // Answer 3 : React is a library for creating user interfaces in web applications. It allows developers to create reusable components that manage their own state,
  // allowing for a cleaner and more modular codebase. React also implements a virtual DOM for optimized rendering of components. This ensures that only the necessary components are updated, leading to faster and more efficient performance of the web application.

  // Question 4 : Describe how you would use Redux in a React project.
  // Answer 4 : Redux is a state management library used in conjunction with React to maintain a centralized store of the application's state. In a React project, you would use Redux to manage the state of different components, dispatch actions to update the state, and create reducers to specify how the application's state
  // should change in response to those actions. This helps establish a unidirectional data flow, making state management more organized and predictable.

  // Question 5 : What is the MERN stack and how is it used in full-stack development?
  // Answer 5 : The MERN stack consists of MongoDB, Express, React, and Node.js. MongoDB is a NoSQL database, Express.js is a web application framework for Node.js,
  // React is used for the front-end, and Node.js is a server-side JavaScript runtime environment. In full-stack development, the MERN stack is used to build end-to-end web applications, including the database, back-end logic, front-end components, and server environment.

  // Question 6 : Explain how Firebase and Axios were used in the MATCHER project.
  // Answer 6 : Firebase was used in the MATCHER project to serve as a real-time database and authentication service. Axios was used to make HTTP requests between the front-end (React) and back-end (Node, Express, and MongoDB). Firebase provided secure storage and user authentication, while Axios facilitated communication between various app components.

  // Question 7 : How do you debug React applications using developer tools?
  // Answer 7 : React Developer Tools is a browser extension available for Chrome and Firefox, allowing you to inspect and debug React components in your application. With these tools, you can inspect individual components and their associated props, state, and context. You can also use breakpoints, console logs, and other
  // traditional debugging techniques to identify any runtime errors or code issues.

  // Question 8 : What is Axios and how is it used in a React project?
  // Answer 8 : Axios is a popular JavaScript library for making HTTP requests from the client to the server. In a React project, Axios is used to fetch data from APIs and send data back to the server. It provides a more flexible, easy-to-use interface than the built-in JavaScript fetch method and handles XMLHttpRequests, making it compatible with older browsers.

  // Question 9 : How do you implement authentication using Google Auth in a project?
  // Answer 9 : To implement authentication using Google Auth, you can use the Google APIs Client Library or a popular library like Firebase Authentication. You'll need to register your project on the Google API Console, obtain OAuth 2.0 client credentials, and include the appropriate SDKs or libraries in your project. Once set up, users can sign in with their Google accounts, granting access to their profile information and enabling you to integrate authentication seamlessly in your application.

  // Question 10 : What are the main differences between SQL and NoSQL databases?
  // Answer 10 : SQL databases are relational and use structured query language (SQL) for managing and querying data. They operate on predefined schema, have strict
  // relationships between tables, and usually follow the ACID properties. NoSQL databases, on the other hand, are non-relational and can store unstructured and semi-structured data. They don't follow a fixed schema and offer more flexibility in data storage and retrieval. Examples of NoSQL databases include MongoDB, Couchbase, and Cassandra.

  // Question 11 : What is the role of React Router in a React application?
  // Answer 11 : React Router is a powerful routing library used to handle client-side navigation between different views or components in a React application. It allows developers to define routes and associate them with specific components, controlling which components are rendered based on the current route in the application. This provides a dynamic, SPA (Single Page Application) experience for users.

  // Question 12 : Explain the concept of a virtual DOM in React.
  // Answer 12 : The virtual DOM is a lightweight, in-memory representation of the actual DOM used by React to optimize component rendering. When a component's state changes, React generates a new virtual DOM and performs a diffing algorithm to determine the minimal set of changes required to update the actual DOM. This process is called reconciliation, and it makes React applications render updates more efficiently and performantly.

  // Question 13 : What is the difference between HTML and JSX?
  // Answer 13 : HTML (Hypertext Markup Language) is the standard markup language used to create web pages and define the structure and appearance of content. JSX (JavaScript XML) is a syntax extension for JavaScript used primarily in React components. It allows developers to write HTML-like code directly within JavaScript
  // code, making it easier to intermingle logic and presentation. JSX is processed and converted into JavaScript during the build process.

  // Question 14 : How do you handle form data in a React application?
  // Answer 14 : To handle form data in a React application, you can use controlled or uncontrolled components. Controlled components maintain the form data in the component's state, updating the state as the user interacts with the form. Uncontrolled components, meanwhile, store form data directly in the DOM elements, and
  // you can use methods like ref to access the values when needed, such as when the form is submitted.

  // Question 15 : What is tailwind CSS, and how can it be utilized in a project?
  // Answer 15 : Tailwind CSS is a utility-first CSS framework that provides pre-built classes for styling HTML elements directly in the markup. Instead of using pre-defined components, you create custom designs by applying utility classes to elements based on the desired styles. In a project, it can be utilized to create responsive, consistent designs with a smaller CSS footprint compared to traditional frameworks. It's particularly useful for rapid UI prototyping and development.`

  var inputText = `Question 1 : Can you explain the process of building data and logic-driven web-based workflow systems using bubble.io?
Answer 1 : Building data and logic-driven web-based workflow systems using bubble.io involves creating user interfaces using bubble's visual editor, setting up 
database structures and workflows, and defining the logic behind the workflows using bubble's built-in tools. Custom coding might be required if the built-in tools are not enough to meet the requirements.

Question 2 : What projects have you worked on in the past with custom coding?
Answer 2 : In the CV, the candidate has mentioned working on the DISTORT, MATCHER, and ALL_CRYPTO projects with custom coding. The DISTORT project is a Discord import ReactDOM from "react-dom/client";
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

Question 3 : How do you typically go about debugging and testing your code?
Answer 3 : Debugging and testing code involve using various developer tools, such as React Developer Tools for frontend debugging, and Google Chrome Developer Tools for checking API calls and error handling. Backend debugging might involve using a tool like Postman to test API endpoints. Unit testing frameworks like Jest or Mocha can also be used to test individual functions or components.

Question 4 : What is your approach to documenting a project?
Answer 4 : Documenting a project starts with writing clear and concise code comments that explain the functionality of the code segments. In addition, creating 
a comprehensive readme file that details the project's requirements, technologies, installation process, and usage guidelines is crucial. Also, using tools like JSDoc or ApiDoc for generating API documentation, and documenting any custom configurations or settings unique to the project, is essential.

Question 5 : Can you list the different data sources, SDKs, and APIs you have experience working with?
Answer 5 : In the CV, the candidate has mentioned working with Firebase, Axios, and Heroku for backend-frontend connections and environment-variable protection. They have also likely worked with other data sources, SDKs, and APIs in their past projects, but specific examples are not provided.

Question 6 : How do you demonstrate your strong analytical skills in your work?
Answer 6 : Strong analytical skills can be demonstrated by efficiently analyzing project requirements, breaking complex problems down into manageable tasks, and using algorithms and data structures to optimize code performance. Additionally, these skills can be showcased by continuously seeking to improve the project deliverables while maintaining high code quality and adhering to deadlines.

Question 7 : What is your experience with HTML/CSS and frontend frameworks like React?
Answer 7 : The candidate's CV mentions experience in developing web applications using HTML, CSS, and JavaScript, along with frontend frameworks like ReactJs. Moreover, they have used React components, and state management libraries such as Redux, and additional libraries like Tailwind CSS.`;
  log("\n --- Now converting the code part of answers to HTML ENTITITES --");

  let regex = /[&|<|>|"|']/g;
  let htmlString = inputText.replace(regex, function(match) {
    if (match === "&") {
      return "&amp;";
    } else if (match === "<") {
      return "&lt;";
    } else if (match === ">") {
      return "&gt;";
    } else if (match === '"') {
      return "&quot;";
    } else {
      return "&apos;";
    }
  });
  // log(htmlString);
  log("\n --- Now converting to proper format for EJS rendering --");
  inputText = htmlString || "";

 // Define the regular expressions for matching questions and answers
const questionRegex = /Question (\d+) : (.*?)(?=\nAnswer|$)/gs;
const answerRegex = /Answer \d+ : (.*?)(?=\n\nQuestion|$)/gs;
let match;
  const result = [];

  // Extract questions
  while ((match = questionRegex.exec(inputText)) !== null) {
    const question = match[2].trim();
    result.push({ ques: question, ans: '' });
  }

  // Extract answers and assign them to corresponding questions
  let resultIndex = 0;
  while ((match = answerRegex.exec(inputText)) !== null) {
    const answer = match[1].trim();
    result[resultIndex].ans = answer;
    resultIndex++;
  }
  // result.forEach((e, index) => {
  //   log(index, e, "\n");
  // })
  // log(result);
  return result;
}

export async function model1(jd, cv) {
  const prompt1 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, List out the Questions & answers to 15 most important coding questions.
  The output format should be as follows:

  "Question 1 : What is meaning of React 
  Answer 1 : React means a framework"

  and don't include any backticks in output
  Questions can include implementation, algorithm code, how to use the technology mentioned in JD to solve a problem. 
  Include code in answers, and explain the code in layman's terms.
  If candidates CV does not have the answer to question asked, provide an answer. \n
  Here is the JD :\n ${jd} \n  Here is the CV :\n ${cv}.  `;
  const prompt2 = `As a top Career Adviser, based on the JD (Job description) and CV (Resume) below, List out the Questions & answers,according to JD and CV earlier provided. Assess the candidate's knowledge and understanding related to the provided Job Description and CV.
  The format should be as follows
  Question 1 : Question generated
  Answer 1 : Answer generated
  
  Question 2 : Question generated
  Answer 2 : Answer Generated

  If candidates CV does not have the answer to question asked, provide an answer.
  Here is the JD :\n ${jd} \n  Here is the CV :\n ${cv}.`;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  var count = 1;

  const history = [];

  while (true) {
    log("\n Count:" + count);
    var user_input = prompt2;
    if (count == 2) user_input = prompt1;
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
      });

      const completion_text = completion.data.choices[0].message.content;
      log(completion_text);

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

// module.exports = { model1, convert };
// module.exports = convert;
