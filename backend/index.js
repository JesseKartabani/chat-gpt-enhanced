require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-befA4QJqiQLF50sV7wQ5GQvP",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.post("/", async (req, res) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
