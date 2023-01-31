// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create a new OpenAI configuration object
const configuration = new Configuration({
  organization: "org-befA4QJqiQLF50sV7wQ5GQvP",
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new OpenAIApi instance
const openai = new OpenAIApi(configuration);

// Create a new Express app
const app = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(cors());

// Set the server port
const port = process.env.PORT || 5000;

// Define a POST endpoint for generating completions
app.post("/", async (req, res) => {
  // Get the message and temperature from the request body
  const { message } = req.body;
  const { temperature } = req.body;

  // Create a completion using the OpenAI API
  const response = await openai.createCompletion({
    // Can change this to any model (text-davinci-003 is the most expensive)
    model: "text-davinci-003",
    prompt: `${message}`,
    // Max size of the ai response, also includes the token size of the prompt
    max_tokens: 800,
    // How logical vs creative the ai response will be
    temperature: temperature,
  });

  // Respond with the ai's generated message
  res.json({
    message: response.data.choices[0].text,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

module.exports = app;
