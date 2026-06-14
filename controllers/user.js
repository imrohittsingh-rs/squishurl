const User = require("../models/user");
const { setUserSession } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("signup", { error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("signup", {
      error: "Email not registered, please sign up first",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.render("login", {
      error: "Incorrect password, please try again",
    });
  }

  const token = setUserSession({
    id: user._id,
    name: user.name,
    email: user.email,
  });
  res.cookie("uid", token); // Set token in cookie
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
