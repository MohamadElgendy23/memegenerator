const express = require("express");
const axios = require("axios");

const memeRouter = express.Router();

const baseURL = "https://api.imgflip.com";

memeRouter.post("/generate", async (req, res) => {
  const { template_id, text0, text1 } = req.body;

  // build up the form data for the request
  const form = new FormData();
  form.append("template_id", template_id);
  form.append("username", process.env.API_USERNAME);
  form.append("password", process.env.API_PASSWORD);
  form.append("text0", text0);
  form.append("text1", text1);

  const response = await axios.post(`${baseURL}/caption_image`, form);
  const memeData = await response.data.data;
  res.status(201).send(memeData);
});

module.exports = memeRouter;
