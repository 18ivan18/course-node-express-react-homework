const express = require("express");
const router = express.Router({ mergeParams: true });
const Recipe = require("../../models/recipeSchema");
const User = require("../../models/userSchema")
const mongoose = require("mongoose");
const error = require("../../utils").error;

const localhostURL = "http://localhost:8080/api/users/";

router.get("/", async (req, res) => {
  console.log(`get all recipes for`, req.params.userId);
  try {
    const recipes = await Recipe.find({ authorId: req.params.userId });
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

router.get("/:recipeId", async (req, res) => {
  console.log(
    `get ${req.params.userId}'s recipe by recipe id ` + req.params.recipeId
  );
  try {
    const recipe = await Recipe.findOne({
      authorId: req.params.userId,
      _id: req.params.recipeId,
    });
    if (recipe) {
      return res.json({ recipe, success: true });
    }
    error(req, res, 500, "Not found");
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

router.delete("/:recipeId/", async (req, res) => {
  console.log(
    `delete ${req.params.userId}'s recipe by user id ` + req.params.userId
  );
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.sendStatus(204);
  } catch (err) {
    error(
      req,
      res,
      500,
      `Error while deleting recipe ${req.params.recipeId}`,
      err
    );
  }
});

router.put("/:recipeId/", async (req, res) => {
  console.log(req.params.recipeId);

  try {
    const result = await Recipe.findByIdAndUpdate(req.params.recipeId, {
      ...req.body,
      modificationDate: new Date(),
    });
    if (result) {
      return res.status(204).json({ success: true });
    }
    error(req, res, 500, `Nothing was updated`);
  } catch (err) {
    error(
      req,
      res,
      500,
      `Error while updating recipe ${req.params.userId}`,
      err
    );
  }
});

router.post("/", async (req, res) => {
  console.log(`post new recipe for ${req.params.userId}`);
  console.log(`body`, req.body);
  //validate
  try {
  const user = await User.findById(req.params.userId);
  const recipe = new Recipe({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    authorId: req.params.userId,
    author: user.name
  });
  
    const result = await recipe.save();
    res
      .status(201)
      .location(localhostURL + req.params.userId + "/recipes/" + recipe._id)
      .json({
        success: true,
        message: "New recipe posted",
        result: result,
      });
  } catch (err) {
    error(req, res, 500, `Error while submitting new recipe`, err);
  }
});

module.exports = router;
