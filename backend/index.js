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
  organization:
    process.env.OPENAI_ORGANIZATION || "org-befA4QJqiQLF50sV7wQ5GQvP",
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

  let result = "";
  let total_tokens = 0;

  // From the command line call npm update openai to use gpt-4 and make sure your openai account has access as well
  const response = await openai.createChatCompletion({
    model: model,
    messages: [
      // Note system messages do not currently influence the answer significantly
      // {"role": "system", "content": "You are a helpful friendly assistant"},
      { role: "user", content: message },
    ],
    temperature: temperature,
  });

  result = response.data.choices[0].message.content.trim();
  total_tokens = response.data.usage.total_tokens;

  // Respond with the ai's generated message
  res.json({
    message: result,
    token_usage: total_tokens,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

module.exports = app;
