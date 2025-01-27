const express = require("express");
const app = express();
const axios = require("axios");

const memeRouter = express.Router();

const baseURL = "https://api.imgflip.com/";

memeRouter.post("/generate", async (req, res) => {
  const { template_id, username, password, text0, text1 } = req.body;
  const response = await axios.post(`${baseURL}/caption_image`, {
    template_id: template_id,
    username: username,
    password: password,
    text0: text0,
    text1: text1,
  });
  const memeData = await response.data.data;
  console.log(memeData);
  res.send(201).json(memeData);
});

memeRouter.post("/search", async (req, res) => {
  const { username, password, query } = req.body;
  const response = await axios.post(`${baseURL}/caption_image`, {
    username: username,
    password: password,
    query: query,
  });
  const searchData = await response.data.data;
  res.send(201).json(searchData);
});

module.exports = memeRouter;
