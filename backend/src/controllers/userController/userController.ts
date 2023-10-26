import { Request, Response } from "express";
import userModel from "../../models/userModel";
import generateToken from "../../utils/generateToken";

const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password, createdAt } = req.body;
    console.log(req.body);

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      name,
      username,
      email,
      password,
      createdAt,
    });

    if (user) {
      const token = generateToken(user._id);
      console.log(token);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occured during Signup" });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    if (user?.isBlocked === true) {
      return res.status(401).json({ message: "User is blocked" });
    }

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.status(201).json({ user, token });
    } else {
      return res.status(401).json({ message: "Invalid Email and Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "server Error on user login" });
  }
};



export { userSignup, userLogin, };
