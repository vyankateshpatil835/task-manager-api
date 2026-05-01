const bcrypt = require("bcryptjs");
const user = require("../models/user");
const generateToken = require("../util/generateToken");

//@desc  //Registers User
//@route //POST /api/auth/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide All Information" });
    }

    const userEmail = await user.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: "This Email Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      token: generateToken(createUser._id),
    });
  } catch (error) {
    next(error);
  }
};

//@desc  //login User
//@route //POST /api/auth/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Enter Email and Password" });
    }

    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "Please Enter Valid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Please Enter Valid Email or Password" });
    }

    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      token: generateToken(foundUser._id),
    });
  } catch (error) {
    next(error);
  }
};

const allUsers = async (req, res, next) => {
  try {
    const allUser = await user.find();
    res.status(200).json(allUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, allUsers };
