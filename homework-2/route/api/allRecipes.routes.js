const express = require("express");
const router = express.Router({ mergeParams: true });
const Recipe = require("../../models/recipeSchema");
const mongoose = require("mongoose");
const error = require("../../utils").error;

router.get("/", async (req, res) => {
  console.log(`get all recipes`);
  try {
    const recipes = await Recipe.find();
    res.json({ recipes, success: true });
  } catch (err) {
    error(
      req,
      res,
      500,
      `Error while retrieving recipes for ${req.params.userId}`,
      err
    );
  }
});


module.exports = router;