import User from "../models/User";
import { generateToken } from "../middlewares/token";
export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { email, username, avatar, googleId } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const token = generateToken(user._id);
      res
        .status(200)
        .json({ message: "User logged in successfully", token: token });
    } else {
      const newUser = new User({
        email: email,
        username: username,
        avatar: avatar,
        googleId: googleId,
      });
      await newUser.save();
      const token = generateToken(newUser._id);
      res
        .status(200)
        .json({ message: "User logged in successfully", token: token });
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const token = generateToken(user._id);
      res
        .status(200)
        .json({ message: "User logged in successfully", token: token });
    }
    res.status(404).send("User not found");
  } catch (err) {
    next(err);
  }
};
git fetch vs pull