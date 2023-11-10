import { Request, Response } from "express";
import userModel from "../../models/userModel";
import GroupModel from "../../models/groupModel";
import { Types } from "mongoose";

interface Discussion {
  userId: Types.ObjectId;
  title: string;
  content: string;
  // Add other necessary types
}

// Assuming `group` has a type like this
interface Group extends Document {
  discussions: Discussion[];
  save(): Promise<Document>;
  // Other properties
}

const createNewDiscussion = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    
    const group: Group | null = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({ message: "UserId not found!" });
    }

    const { title, content } = req.body;
    
    const newDiscussion: Discussion = {
      userId: userId as unknown as Types.ObjectId,
      title: title,
      content: content,
    };

    group.discussions.push(newDiscussion);
    await group.save();

    return res.status(201).json({ message: "Discussion created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export {
    createNewDiscussion,
  };
