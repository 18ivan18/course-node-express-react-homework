const mongoose = require("mongoose");
const validator = require("email-validator");

const validatePass = (password) => {
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
  );
};

const validateEmail = (email) => {
  return validator.validate(email);
};

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validateEmail,
  },
  password: { type: String, required: true, validate: validatePass },
  gender: { type: String, required: true, enum: ["F", "M"] },
  profilePicture: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 512 },
  validity: {
    type: String,
    required: true,
    enum: ["active", "suspended", "deactivated"],
  },
  role: { type: String, required: true, enum: ["user", "admin"] },
  registerDate: { type: Date, default: new Date() },
  modificationDate: { type: String, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
