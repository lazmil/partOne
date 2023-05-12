import { config } from "dotenv";
import fs from 'fs';

config();

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY
  })
);

const inputFile = 'input.txt';

fs.readFile(inputFile, 'utf8', async (err, data) => {
  if (err) {
    console.error(`Error reading ${inputFile}:`, err);
    return;
  }

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: data }],
  });

  const response = res.data.choices[0].message.content;
  console.log(response);
});


