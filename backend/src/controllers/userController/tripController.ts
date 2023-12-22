import { Request, Response } from "express";
import PublicTripModel from "../../models/publicTripModel";
import userModel from "../../models/userModel";

const createPublicTrip = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "UserId not found!" });
    }

    const {
      destination,
      arrivalDate,
      departureDate,
      noOfTravelers,
      description,
    } = req.body;
    if (!req.body) {
      return res.status(404).json({ message: "No data found on body" });
    }

    const publicTrip = await PublicTripModel.create({
      userId: userId,
      destination: destination,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      noOfTravelers: noOfTravelers,
      description: description,
    });

    if (publicTrip) {
      const userData = await userModel.findById(userId);

      if (userData) {
        userData.publicTrips.push(publicTrip._id);
        await userData.save();
      } else {
        console.error("User data not found");
        return res.status(404).json({ message: "User data not found" });
      }
      
      return res
        .status(201)
        .json({ message: "Created Public trip Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPublicTrips = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const today = new Date();
    
    const publicTrips = await PublicTripModel.find({
      userId: userId,
      arrivalDate: { $gte: today },
    })

    if(publicTrips) {
      return res.status(201).json({message: "Success", publicTrips});
    } else {
      return res.status(404).json({message: "Coudn't find publicTrips"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"})
  }
}

const getOtherUserTrips = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const today = new Date();
    
    const publicTrips = await PublicTripModel.find({
      userId: id,
      arrivalDate: { $gte: today },
    })

    if(publicTrips) {
      return res.status(201).json({message: "Success", publicTrips});
    } else {
      return res.status(404).json({message: "Coudn't find publicTrips"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"})
  }
}

export { createPublicTrip, getPublicTrips, getOtherUserTrips };
