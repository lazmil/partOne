import fs from 'fs';

import { Configuration, OpenAIApi } from 'openai';

// Create an instance of the OpenAIApi using your API key
const openai = new OpenAIApi(
  new Configuration({
    apiKey: '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',
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

