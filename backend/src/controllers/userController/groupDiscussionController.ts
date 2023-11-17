import { Request, Response } from "express";
import GroupModel from "../../models/groupModel";
import DiscussionModel from "../../models/discussionModel";


const createNewDiscussion = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({ message: "UserId not found!" });
    }

    const { title, content } = req.body;

    const discussion = await DiscussionModel.create({
      userId: userId,
      title: title,
      content: content,
      groupId: groupId,
    });

    if (discussion) {
      group.discussions.push(discussion._id);
      await group.save();
      return res
        .status(201)
        .json({ message: "Discussion created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleDiscussion = async (req: Request, res: Response) => {
  try {
    const { discussionId } = req.params;
    console.log(discussionId);

    const discussion = await DiscussionModel.findById(discussionId)
      .populate("userId")
      .populate({
        path: "groupId",
        select: "name",
      })
      .populate({
        path: "replies.userId",
        select: "name profileImage address"
      });

    if (discussion) {
      console.log(discussion);
      return res.status(201).json({ discussion });
    } else {
      return res.status(404).json({ message: "Discussion not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const postDiscussionReply = async (req: Request, res: Response) => {
  try {
    
    const { discussionId } = req.params;
    const userId = req.user?.id;
    const { replyMessage } = req.body;

    if (!userId) {
        return res.status(404).json({ message: "UserId not found!" });
    }

    if (!replyMessage) {
        return res.status(400).json({ message: "Reply message is required!" });
    }

    const discussion = await DiscussionModel.findOneAndUpdate(
      { _id: discussionId }, 
      {
        $push: {
          replies: {
            userId: userId,
            replyMessage: replyMessage,
          },
        },
      },
    { new: true });

    if (!discussion) {
      return res.status(400).json({ message: "Discussion not found!" });
    }

    return res.status(201).json({ message: "Successfully posted reply" });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}
};

export { createNewDiscussion, getSingleDiscussion, postDiscussionReply };
