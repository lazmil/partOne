import { config } from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
config();

import { Configuration, OpenAIApi } from 'openai';

// Create an instance of the OpenAIApi using the API key from the environment variables
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const inputFile = 'input.txt';

// Read the content from input.txt file
fs.readFile(inputFile, 'utf8', async (err, data) => {
  if (err) {
    console.error(`Error reading ${inputFile}:`, err);
    return;
  }

  // Send the input text to ChatGPT for generating a response
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: data },
    ],
  });

  // Extract the response from the API response
  const response = res.data.choices[0].message.content;
  console.log(response);
});


