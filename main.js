const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.OPENAI_API_KEY;
const client = axios.create({ headers: { Authorization: "Bearer " + apiKey } });
const path = require("path");
var input = "";
var sentiment = "";

app.use(express.urlencoded({ extended: true }));
//post only
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.send("Thanks for learning more about us.");
});

app.post("/result", (req, res) => {
  // res.render("result", {data: "ok"})
  input = req.body.comment;
  console.log(input);

  const completionParams = {
    prompt:
      "the following system classifies article reviews for products at an e-commerce platform, and classifies it as either 'happy', 'upset' or 'neutral': review: I like this pair of earrings a lot! sentiment: happy; review: It does not worth the price! sentiment: upset; review: the delivery takes for ages! sentiment: upset; review: " +
      input +
      " sentiment: ",
    max_tokens: 10,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.7,
  };

  client
    .post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      completionParams
    )
    .then((result) => {
      console.log("###" + result.data.choices[0].text + "###");
      sentiment = result.data.choices[0].text;
      if (sentiment.includes("happy")) {
        res.render("result", {
          data: "I'm glad you enjoying shopping with us!",
        });
      } else if (sentiment.includes("neutral")) {
        res.render("result", {
          data: "I care about your shopping experience and I'm constantly improving on my work!",
        });
      } else if (sentiment.includes("upset")) {
        res.render("result", {
          data: "I'm sorry to hear that, one of our staff will be contacting you shortly!",
        });
      } else {
        res.send(
          "Thank you for shopping with us! Please visit http://localhost:8080 for more offers!"
        );
      }
      console.log("###" + result.data.choices[0].text + "###");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/result", (req, res) => {
  res.send(
    "Thank you for shopping with us! Please visit http://localhost:8080 for more offers!"
  );
});

app.listen(8080);

module.exports = app;
