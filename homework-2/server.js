const express = require("express");
const mongoose = require('mongoose')
const app = express();
const port = 8080 || process.env.PORT;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());  
app.use(cors());

app.use("/api/users", require("./route/api/user.routes"));
app.use("/api/recipes", require("./route/api/allRecipes.routes"));
app.use("/api/users/:userId/recipes", require("./route/api/recipes.routes"));

const URI = process.env.URI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      success: err.success
    });
  });

app.listen(port, () =>
  console.log(`Cooking api listening at http://localhost:${port}`)
);
