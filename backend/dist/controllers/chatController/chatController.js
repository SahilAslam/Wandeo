"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAllMessages = exports.sendMessage = exports.fetchChat = exports.accessChat = exports.findUserToChat = void 0;
const chatModel_1 = __importDefault(require("../../models/chatModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const messageModel_1 = __importDefault(require("../../models/messageModel"));
const findUserToChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchInput } = req.body;
        const user = req.user;
        if (!searchInput) {
            return;
        }
        const searchResults = yield userModel_1.default.find({
            name: { $regex: searchInput, $options: 'i' },
            _id: { $ne: user === null || user === void 0 ? void 0 : user.id },
        }).populate('name profileImage');
        if (!searchResults) {
            return;
        }
        return res.status(200).json({ message: 'success', searchResults });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findUserToChat = findUserToChat;
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "userId not found!" });
    }
    let isChat = yield chatModel_1.default.find({
        $and: [
            { users: { $elemMatch: { $eq: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");
    if (isChat.length > 0) {
        return res.status(201).json({ chat: isChat[0] });
    }
    else {
        let chatData = {
            chatName: "sender",
            users: [(_b = req.user) === null || _b === void 0 ? void 0 : _b.id, userId]
        };
        try {
            const createdChat = yield chatModel_1.default.findOne(chatData);
            const fullChat = yield chatModel_1.default.findOne({ _id: createdChat === null || createdChat === void 0 ? void 0 : createdChat._id }).populate("users", "-password");
            return res.status(200).json({ chat: fullChat });
        }
        catch (error) {
            console.log(error);
            res.status(400);
            throw new Error(error.message);
        }
    }
});
exports.accessChat = accessChat;
const fetchChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const chat = chatModel_1.default.find({ users: { $elemMatch: { $eq: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        return res.status(200).json({ chat });
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchChat = fetchChat;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { content, chatId } = req.body;
        if (!content || !chatId) {
            return res.status(400).json({ error: 'Invalid' });
        }
        let newMessage = {
            sender: user === null || user === void 0 ? void 0 : user.id,
            chat: chatId,
            content: content
        };
        let message = yield messageModel_1.default.create(newMessage);
        message = yield message.populate('sender', 'name profileImage');
        message = yield message.populate('chat');
        yield chatModel_1.default.findByIdAndUpdate(chatId, {
            lastMessage: message
        }, { new: true });
        return res.status(200).json({ msg: 'Messsage sent', message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMessage = sendMessage;
const showAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const chatId = req.params.chatId;
        const message = yield messageModel_1.default.find({ chat: chatId })
            .populate('sender', 'name profileImage')
            .populate('chat');
        if (!message) {
            return;
        }
        res.status(200).json({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.showAllMessages = showAllMessages;
