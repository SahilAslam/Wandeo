import { NextFunction, Request, Response } from "express";
import userModel from "../../models/userModel";
import generateToken from "../../utils/generateToken";
import jwt, { JwtPayload } from "jsonwebtoken";

const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password, createdAt } = req.body;
    console.log(req.body);

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
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

const googleSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.credential;

    const decodedData = jwt.decode(token) as JwtPayload | null;

    if (!decodedData || typeof decodedData !== 'object') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { name, email, picture, jti } = decodedData;

    if (!name || !email || !picture || !jti) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(401).json({ error: 'User Already Exist' });
    }

    const newUser = new userModel({
      name,
      email,
      profileImage: picture,
      password: jti,
    });

    await newUser.save();

    res.status(201).json({ message: 'user saved successfully' });
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req: Request, res: Response , next: NextFunction) => {
  try {
      const token = req.body.credential;

      const decodedData = jwt.decode(token) as JwtPayload | null;
      console.log(decodedData, "dedede")

      if (!decodedData || typeof decodedData !== 'object') {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const {name , email , picture , jti} = decodedData;

      if (!name || !email || !picture || !jti) {
        return res.status(401).json({ error: 'Invalid token payload' });
      }

      const user = await userModel.findOne({email: email});
      console.log("userData: ", user)
      if(user){
          if (user.isBlocked) {
              return res.status(401).json({ error: 'Account is blocked' });
          }
          const usertoken = jwt.sign({user_id: user._id, email: user.email} , process.env.JWT_SECRET as string, {expiresIn: '30d'});
          res.status(200).json({message : 'Login Successfull' ,  usertoken, 
              userData : { 
                  id : user._id,
                  name : user.name ,
                  email : user.email,
                  profileImage : picture
              }});

      } else {
          res.status(401).json({error : 'User not found'});
      }
  } catch (error) {
      next(error);
  }
}


export { userSignup, userLogin, googleSignup, googleLogin};
