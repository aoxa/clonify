const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  likedSongs: { type: [String], default: [] },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {_id: this.id, name: this.name},
    process.env.JWTPRIVATEKEY,
    {expiresIn: '6d'}
  )

  return token;
}

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().email.required(),
    password: passwordComplexity().required()
  });

  return schema.validate(user);
}

const User = mongoose.model('user', userSchema);

module.exports = {user, valdate};