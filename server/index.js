import express from "express";
import bodyParser from "body-parser";
import mongose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({  limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
const CONNECTION_URL = "mongodb://127.0.0.1:27017/";
const PORT = process.env.PORT || 5000;

mongose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} `);
    });
  })
  .catch(err => {
    console.log(err.message);
  });

app.post("/some", function(req, res) {
  res.send(req.body);
});
