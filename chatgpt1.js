const axios = require('axios');

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your ChatGPT API key

async function generateQuestionsAndAnswers(studentDetails, jobDetails) {
  const prompt = `As an interviewer for the ${jobDetails.role} position, what are the top 50 questions you should ask ${studentDetails.name}?`;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt,
      max_tokens: 500,
      n: 50,
      stop: '###',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const { choices } = response.data.choices[0];

    // Extract the questions and answers
    const questions = [];
    const answers = [];

    for (const choice of choices) {
      const text = choice.text.trim();

      if (text.startsWith('Q:')) {
        questions.push(text.replace('Q:', '').trim());
      } else if (text.startsWith('A:')) {
        answers.push(text.replace('A:', '').trim());
      }
    }

    // Print the questions and answers
    for (let i = 0; i < questions.length; i++) {
      console.log(`Question ${i + 1}: ${questions[i]}`);
      console.log(`Answer ${i + 1}: ${answers[i]}`);
      console.log('---------------------------------');
    }
  } catch (error) {
    console.error('An error occurred:', error.response.data.error);
  }
}

// Example usage
const student = {
  name: 'John Doe',
  experience: '...',
  internships: '...',
  projects: '...',
};

const job = {
  role: 'Software Engineer',
  company: 'ABC Corp',
};

generateQuestionsAndAnswers(student, job);
