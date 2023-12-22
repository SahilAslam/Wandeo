import { Request, Response } from "express";
import GroupModel from "../../models/groupModel";
import HostingModel from "../../models/hostingModel";
import userModel from "../../models/userModel";
import PublicTripModel from "../../models/publicTripModel";

export const listGroups = async (req: Request, res: Response) => {
  try {
    const groups = await GroupModel.find();

    if (!groups || groups.length === 0) {
      return res.status(400).json({ error: "No users found" });
    }

    res.status(201).json({ message: "success", groups });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listHostingUsers = async (req: Request, res: Response) => {
  try {
    const loggedinUser = req.user?.id;
    const hosts = await HostingModel.find({
      userId: { $ne: loggedinUser },
    }).populate({
      path: "userId",
      populate: {
        path: "groups", // Specify the field you want to populate
        model: "Group", // The model to use for population
      },
    });

    if (!hosts || hosts.length === 0) {
      return res.status(400).json({ error: "No hosters found" });
    }

    res.status(201).json({ message: "Success", hosts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSearchedUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const users = await userModel.find({
      isBlocked: false,
      _id: { $ne: userId },
    });
    if (users) {
      return res.status(201).json({ users });
    } else {
      return res.status(404).json({ message: "Coudn't find users" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchTavelers = async (req: Request, res: Response) => {
  try {
    const loggedinUser = req.user?.id;

    const currentDate = new Date();
    
    const travelers = await PublicTripModel.find({
      userId: { $ne: loggedinUser },
      departureDate: { $gte: currentDate },
    }).populate("userId");

    res.status(201).json({ message: "Success", travelers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
