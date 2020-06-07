const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  authorId: mongoose.Schema.Types.ObjectId,
  name: { type: String, maxlength: 80 },
  time: { type: Number },
  picture: { type: String },
  shortDescription: { type: String, maxlength: 256 },
  detailedDescription: { type: String, maxlength: 2048 },
  submissionDate: { type: Date, default: new Date() },
  modificationDate: { type: String, default: new Date() },
  products: { type: Array },
  tags: { type: Array },
  author: { type: String },
});

module.exports = mongoose.model("Recipe", recipeSchema);
