const express = require("express");
const cors = require("cors");
const memeRouter = require("./routes/memeRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/meme", memeRouter);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
