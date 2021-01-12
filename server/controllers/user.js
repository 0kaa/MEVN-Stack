import User from "../models/user.js";

export const userRegister = async (req, res) => {
  const users = await User.find();
  console.log(req.query);
  res.status(200).json(users);
};
