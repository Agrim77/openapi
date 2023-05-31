const prompt1 = "I will provide you the details of the student you are interviewing (the past experience, internships and personal projects) and details of job you are interviewing for. Your job is to generate top 50 questions a interviewer must ask, not basic questions, and provide answers to that questions with examples explaining the concept or coding question in laymans term, if code is required in answer print the code too"

const prompt2 = `As an interviewer for the ${jobDetails.role} position, what are the top 50 questions you should ask ${studentDetails.name}?`;

const prompt3 = "As an interviewer for the frontend developer position, the role requires him/her to know in-depth concepts of routing, ReactJs redux, async/await functions, API calls, etc. what are the top 20 questions, 10 questions about important concepts, 10 questions about code, 5 of which should ask about guessing the output, and 5 about writing the syntax. You should ask a student which had done 3 month internship in a similar organisation as yours? Further provide answers with examples of code if required, concepts explained in layman's terms.Very Important: Explain the concept in laymans term using example"

exports.prompt1 = prompt1;
exports.prompt2 = prompt2;