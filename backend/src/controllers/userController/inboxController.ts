import { Request, Response } from "express";
import HostUserModel from "../../models/hostingAndTravelingModel";
import HostingAndTravelingModel from "../../models/hostingAndTravelingModel";
import DirectMessageModel from "../../models/directMessage";

export const getHostingMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const hostingMessage = await HostUserModel.find({
      $or: [{ hostingUser: userId }, { requestingUser: userId }],
    })
      .populate("hostingUser")
      .populate("requestingUser");

    if (hostingMessage) {
      return res
        .status(201)
        .json({ message: "Success", messages: hostingMessage });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleHostingMessage = async (req: Request, res: Response) => {
  try {
    const {chatId} = req.params;

    const hostingMessage = await HostUserModel.findOne({ _id: chatId })
      .populate("hostingUser")
      .populate("requestingUser")
      .populate({
        path: 'messages.userId',
        model: 'userCollection', // Replace with the actual model name for user
      });

    if (hostingMessage) {
      return res
        .status(201)
        .json({ message: "Success", chat: hostingMessage });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const sendResponse = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { chatId } = req.params;

    const { message, updationMessage } = req.body;

    const chat = await HostingAndTravelingModel.findOneAndUpdate({_id: chatId}, {
      $push: {
        messages: {
          userId: userId,
          message: message,
        },
      },
      response: updationMessage,
      latestMessage: { userId: userId, message: message, createdAt: new Date },
    });

    if (!chat) {
      console.log(chat)
      return res.status(400).json({ message: 'Message not sent' });
    }

    return res.status(201).json({ message: 'Message sent successfully', chat: chat });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createDirectMessage = async (req: Request, res: Response) => {
  try {
      const userId = req.user?.id;
      
      const { targettedUserId } = req.params;

      const { message } = req.body;

      const host = await DirectMessageModel.create({
          messages: [{ userId: userId, message: message, createdAt: new Date() }],
          userOne: userId,
          userTwo: targettedUserId,
          latestMessage: { userId: userId, message: message, createdAt: new Date() },         
      });

      if(host) {
          return res.status(201).json({message: "Saved successfully"})
      }
  } catch (error) {
      console.log(error)
      res.status(500).json({message: "Internal server error"})
  }
}

export const getDirectMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const chat = await DirectMessageModel.find({
      $or: [{ userOne: userId }, { userTwo: userId }],
    })
      .populate("userOne")
      .populate("userTwo")
      .sort({updatedAt: -1})

    if (chat) {
      return res
        .status(201)
        .json({ message: "Success", chat });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleDirectMessage = async (req: Request, res: Response) => {
  try {
    const {chatId} = req.params;

    const directMessage = await DirectMessageModel.findOne({ _id: chatId })
      .populate("userOne")
      .populate("userTwo")
      .populate({
        path: 'messages.userId',
        select: "name profileImage",
        model: 'userCollection',
      })

    if (directMessage) {
      return res
        .status(201)
        .json({ message: "Success", chat: directMessage });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const sendDirectMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { chatId } = req.params;

    const { message } = req.body;
    console.log(message)

    const chat = await DirectMessageModel.findOneAndUpdate({_id: chatId}, {
      $push: {
        messages: {
          userId: userId,
          message: message,
        },
      },
      latestMessage: { userId: userId, message: message, createdAt: new Date() },
    });

    if(chat) {
      console.log(chat.latestMessage)
      return res.status(201).json({ message: 'Message sent successfully', chat });
    }

    if (!chat) {    
      return res.status(400).json({ message: 'Message not sent'});
    }
       
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const findExistingChat = async (req: Request, res: Response) => {
  try {
    const loggedinUser = req.user?.id;

    const {id} = req.params;

    const chat = await DirectMessageModel.findOne({
      $or: [
        { userOne: loggedinUser, userTwo: id },
        { userOne: id, userTwo: loggedinUser },
      ],
    })

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.status(200).json({ chat });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


