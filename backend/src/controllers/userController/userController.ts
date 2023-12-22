import { NextFunction, Request, Response } from "express";
import userModel from "../../models/userModel";
import generateToken from "../../utils/generateToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendMail } from "../../middlewares/nodeMailer";

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

const createUserInfo = async (req: Request, res: Response) => {
  try {
      const {userId} = req.params;

      const {
          dateOfBirth,
          gender,
          address,
      } = req.body;

      const user = await userModel.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "Not found" });
      }

      user.dateOfBirth = dateOfBirth;
      user.gender = gender;
      user.address = address;

      await user.save();

      return res
          .status(200)
          .json({ message: "Profile created successfully", user });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    if (user?.isBlocked === true) {
      return res.status(401).json({ message: "User is blocked" });
    }

    if (user && (await user.matchPassword(password))) {
      user.isLoggin = "Active Now"
      user.markModified('isLoggin');
      await user.save();

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

    res.status(201).json({ message: 'user saved successfully', newUser });
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
          user.isLoggin = "Active Now"
          user.markModified('isLoggin');
          await user.save();

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

const forgetData = {
  otp: null as null | number,
};
const sendPasswordLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);

    if (!email) {
      res.status(401).json({ message: "Enter Your Email" });
    }

    const user = await userModel.findOne({email})

    if(user) {
      const otp = sendMail(email, res);
      forgetData.otp = otp;
    } else {
      return res.status(400).json({ message: "no user " });
    }
  } catch (error) {
    console.log(error);
  }
}

const verifyForgetPassword = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    if (otp == forgetData.otp) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: "please correct passowrd" });
    }
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    userModel.findOne({ email: email }).then((user) => {
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while hashing the password",
          });
        } else {
          userModel
            .findOneAndUpdate(
              { email: email },
              { password: hash }
            )
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update user with ID: ${email}. User not found.`,
                });
              } else {
                res.status(200).send({
                  message: "Successfully updated password",
                });
              }
            })
            .catch((err) => {
              res
                .status(500)
                .send({ message: "Error updating user information" });
            });
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "An error occurred" });
  }
};

const userLogout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if(!userId) {
      return res.status(404).json({message: "userId not found!"})
    }

    const userData = await userModel.findById(userId);
    if(userData) {
      userData.isLoggin = ""   
      userData.lastLogin = new Date();
      userData.markModified('lastLogin', 'isLoggin'); // Notifying Mongoose that lastLogin has been modified
      await userData.save();

      return res.status(201).json({message: "Successfully updated lastLogin"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}


export { userSignup, userLogin, googleSignup, googleLogin, sendPasswordLink, verifyForgetPassword, newPassword, userLogout, createUserInfo };
