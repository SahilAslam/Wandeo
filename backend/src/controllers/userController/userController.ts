import { Request, Response } from "express";
import userModel from "../../models/userModel";
import generateToken from "../../utils/generateToken";
import EventModel from "../../models/eventModel";

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

    const user = await userModel.findOne({ email }).where({ isBlocked: false });

    if (!user) {
      res.status(401).json({ message: "User not Found" });
    }

    if (user?.isBlocked === true) {
      res.status(401).json({ message: "User is blocked" });
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

const createEvent = async (req: Request, res: Response) => {
  console.log("createEvent")
  try {
    const id = req.params.id;

    const { eventName, location , startDate, endDate, attendeesLimit, description } = req.body;
    console.log(req.body);

    const user = await userModel.findById(id);

    if(!user){
        return res.status(404).json({message : 'Not found'});
    }

    const event = await EventModel.create({
      organizedBy: user._id,
      eventName,
      location,
      startDate,
      endDate,
      attendeesLimit,
      description,
    });

    if (event) {
      res.status(201).json({ message: 'Event created successfully' });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occured while creating event" });
  }
};

const getUserEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventModel.find().exec()

    if(!event) {
      res.status(404).json({message: "Cannot find events"})
    }
    
    res.status(201).json({message: event})
  } catch (error) {
    console.error(error);  
  }
}

export { userSignup, userLogin, createEvent, getUserEvent };
