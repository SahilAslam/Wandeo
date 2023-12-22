import { Request, Response } from "express";
import ChatModel from "../../models/chatModel";
import userModel from "../../models/userModel";
import MessageModel from "../../models/messageModel";

export const findUserToChat = async (req: Request, res: Response) => {
    try {
        const {searchInput} = req.body;
        const user = req.user;

        if(!searchInput){
            return;
        }

        const searchResults = await userModel.find({
            name : {$regex : searchInput  , $options : 'i'},
            _id : {$ne : user?.id},
        }).populate('name profileImage');
        
        if(!searchResults){
            return;
        }

        return res.status(200).json({message : 'success' , searchResults});

    } catch (error) {
        console.log(error)
    }
}

export const accessChat = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if(!userId) {
        return res.status(400).json({error: "userId not found!"})
    }

    let isChat = await ChatModel.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user?.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
    .populate("users", "-password")
    .populate("latestMessage")

    // isChat = await userModel.populate(isChat, {
    //     path: "latestMessage.sender",
    //     select: "name profileImage email",
    // });

    if (isChat.length > 0) {
        return res.status(201).json({chat: isChat[0]})
    } else {
        let chatData = {
            chatName: "sender",
            users: [req.user?.id, userId]
        };

        try {
            const createdChat = await ChatModel.findOne(chatData)

            const fullChat = await ChatModel.findOne({ _id: createdChat?._id}).populate("users", "-password");

            return res.status(200).json({chat: fullChat});
        } catch (error: any) {
            console.log(error)
            res.status(400);
            throw new Error(error.message)
        }
    }
}

export const fetchChat = async (req: Request, res: Response) => {
  try {
    const chat = ChatModel.find({ users: { $elemMatch: { $eq: req.user?.id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      
    return res.status(200).json({chat});
      
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const {content , chatId} = req.body;

        if(!content || !chatId){
            return res.status(400).json({error : 'Invalid'});
        }

        let newMessage = {
            sender : user?.id,
            chat : chatId,
            content  : content
        }

        let message = await MessageModel.create(newMessage);
        message = await message.populate('sender' , 'name profileImage');
        message = await message.populate('chat');
        // message = await userModel.populate(message, {
        //     path: 'sender',
        //     select: 'name profileImage'
        // })

        await ChatModel.findByIdAndUpdate(chatId , {
            lastMessage : message
        } , {new : true});

        return res.status(200).json({msg : 'Messsage sent' , message});

    } catch (error) {
        console.log(error)
    }
} 


export const showAllMessages = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const chatId = req.params.chatId;

        const message = await MessageModel.find({chat : chatId})
        .populate('sender' , 'name profileImage')
        .populate('chat');

        if(!message){
            return;
        }

        res.status(200).json({ message })

    } catch (error) {
        console.log(error)
    }
}