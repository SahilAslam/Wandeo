import { Request, Response } from "express";
import userModel from "../../models/userModel";
import GroupModel from "../../models/groupModel";

const createUserGroup = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description, location, image } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not Found!" });
    }

    const group = await GroupModel.create({
      createdBy: user._id,
      name: name,
      description: description,
      location: location,
      image: image,
      members: user._id,
    });

    if (group) {
      console.log(group);

      user.groups.push(group._id);
      user.save();

      return res.status(201).json({ message: "Group created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserGroup = async (req: Request, res: Response) => {
  try {
    const group = await GroupModel.find().exec();

    if (group) {
      return res.status(201).json({ group });
    } else {
      return res.status(404).json({ message: "Coudn't find groups!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const getGroupDetailedPage = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.groupId;

    const group = await GroupModel.findById(groupId)
        .populate("members")
        .populate({
            path: "discussions",
            populate: {
              path: "userId",
              model: "userCollection"
            }
        });
    if (group) {
      res.status(201).json({ group });
      console.log(group);
    } else {
      res.status(404).json({ message: "Coudn't find group" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const joinUserGroup = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.groupId;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({ error: "UserId not found!" });
    }

    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "You are already a Member" });
    }

    group.members.push(userId);
    await group.save();

    const userData = await userModel.findById(userId);

    if (userData) {
      userData.groups.push(group._id);
      await userData.save();
    } else {
      console.error("User data not found");
      return res.status(404).json({ message: "User data not found" });
    }

    return res.status(201).json({ message: "Joined Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const leaveUserGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    console.log(groupId);

    const userId = req.user?.id;
    console.log(userId);

    if (!userId) {
      return res.status(404).json({ error: "UserId not found!" });
    }

    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    if (!group.members.includes(userId)) {
      return res.status(400).json({ message: "You are not a member" });
    }

    group.members = group.members.filter(
      (id) => id.toString() !== userId.toString()
    );
    await group.save();

    const user = await userModel.findById(userId);
    if (user) {
      user.groups = user.groups.filter(
        (groupId) => groupId.toString() !== group._id.toString()
      );
      await user.save();
    } else {
      console.error("User data not found");
      return res.status(404).json({ message: "User data not found" });
    }

    return res.status(201).json({ message: "Leaved Group" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const userJoinedGroup = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const user = await userModel.findById(userId).populate("groups");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export {
  createUserGroup,
  getUserGroup,
  getGroupDetailedPage,
  joinUserGroup,
  leaveUserGroup,
  userJoinedGroup,
};
