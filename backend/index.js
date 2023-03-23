// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Create a new OpenAI configuration object
const configuration = new Configuration({
  organization: "org-befA4QJqiQLF50sV7wQ5GQvP",
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new OpenAIApi instance
const openai = new OpenAIApi(configuration);

// Create a new Express app
const app = express();

// create a rate limiter that limits each user to 100 requests per hour
const userRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 45, // limit each user to 45 requests per windowMs (1 hour)
  message: "Too many requests, please try again later",
  keyGenerator: (req) => req.headers.uid, // user.uid
});

// Configure CORS to allow requests from a specific domain
const corsOptions = {
  origin: "https://chat-gpt-enhanced.web.app",
};

app.use(bodyParser.json());
// Apply the CORS middleware with the configured options
app.use(cors(corsOptions));
// apply the userRateLimit middleware to all requests
app.use(userRateLimit);

// Set the server port
const port = process.env.PORT || 5000;

// Define a POST endpoint for generating completions
app.post("/", async (req, res) => {
  // Get the message, model and temperature from the request body
  const { message } = req.body;
  const { temperature } = req.body;
  const { model } = req.body;

  // Create a completion using the OpenAI API
  const response = await openai.createCompletion({
    // Can change this to any open ai model
    model: `${model}`,
    prompt: `${message}`,
    // Max size of the ai response, also includes the token size of the prompt
    max_tokens: 800,
    // How logical vs creative the ai response will be
    temperature: temperature,
  });

  // Respond with the ai's generated message
  res.json({
    message: response.data.choices[0].text,
    token_usage: response.data.usage.total_tokens,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

module.exports = app;
