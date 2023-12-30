import { Request, Response } from "express";
import userModel from "../../models/userModel";

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { targettedUserId, userId } = req.body;
        console.log("body:", targettedUserId, userId)

        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing or invalid' });
        }

        const myModel = await userModel.findById(userId);
        if (myModel &&  myModel.friends.indexOf(targettedUserId) === -1) {
            myModel.friends.push(targettedUserId);
            await myModel.save();

            const friendModel = await userModel.findById(targettedUserId);
            if (friendModel) {
                friendModel.friends.push(userId); 
                await friendModel.save();
            }
        } else {
            return res.status(400).json({ message: "You are already a friend." });
        }

        return res.status(201).json({ message: "added to friends successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const removeFriend = async (req: Request, res: Response) => {
    try {
      const { targettedUserId, userId } = req.body;
      console.log("body:", targettedUserId, userId)
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is missing or invalid' });
      }
  
      const myModel = await userModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: targettedUserId } },
      );
  
      const friendModel = await userModel.findOneAndUpdate(
        { _id: targettedUserId },
        { $pull: { friends: userId } },
      );
  
      if (myModel && friendModel) {
        return res.status(201).json({ message: "Removed friend" });
      } else {
        return res.status(404).json({ error: "Friend not found" });
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

