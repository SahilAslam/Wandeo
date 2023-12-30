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
exports.findExistingChat = exports.sendDirectMessage = exports.getSingleDirectMessage = exports.getDirectMessages = exports.createDirectMessage = exports.sendResponse = exports.getSingleHostingMessage = exports.getHostingMessage = void 0;
const hostingAndTravelingModel_1 = __importDefault(require("../../models/hostingAndTravelingModel"));
const hostingAndTravelingModel_2 = __importDefault(require("../../models/hostingAndTravelingModel"));
const directMessage_1 = __importDefault(require("../../models/directMessage"));
const getHostingMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const hostingMessage = yield hostingAndTravelingModel_1.default.find({
            $or: [{ hostingUser: userId }, { requestingUser: userId }],
        })
            .populate("hostingUser")
            .populate("requestingUser");
        if (hostingMessage) {
            return res
                .status(201)
                .json({ message: "Success", messages: hostingMessage });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getHostingMessage = getHostingMessage;
const getSingleHostingMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const hostingMessage = yield hostingAndTravelingModel_1.default.findOne({ _id: chatId })
            .populate("hostingUser")
            .populate("requestingUser")
            .populate({
            path: 'messages.userId',
            model: 'userCollection',
        });
        if (hostingMessage) {
            return res
                .status(201)
                .json({ message: "Success", chat: hostingMessage });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleHostingMessage = getSingleHostingMessage;
const sendResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const { chatId } = req.params;
        const { message, updationMessage } = req.body;
        const chat = yield hostingAndTravelingModel_2.default.findOneAndUpdate({ _id: chatId }, {
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
            console.log(chat);
            return res.status(400).json({ message: 'Message not sent' });
        }
        return res.status(201).json({ message: 'Message sent successfully', chat: chat });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendResponse = sendResponse;
const createDirectMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const { targettedUserId } = req.params;
        const { message } = req.body;
        const host = yield directMessage_1.default.create({
            messages: [{ userId: userId, message: message, createdAt: new Date() }],
            userOne: userId,
            userTwo: targettedUserId,
            latestMessage: { userId: userId, message: message, createdAt: new Date() },
        });
        if (host) {
            return res.status(201).json({ message: "Saved successfully" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createDirectMessage = createDirectMessage;
const getDirectMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        const chat = yield directMessage_1.default.find({
            $or: [{ userOne: userId }, { userTwo: userId }],
        })
            .populate("userOne")
            .populate("userTwo")
            .sort({ updatedAt: -1 });
        if (chat) {
            return res
                .status(201)
                .json({ message: "Success", chat });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDirectMessages = getDirectMessages;
const getSingleDirectMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const directMessage = yield directMessage_1.default.findOne({ _id: chatId })
            .populate("userOne")
            .populate("userTwo")
            .populate({
            path: 'messages.userId',
            select: "name profileImage",
            model: 'userCollection',
        });
        if (directMessage) {
            return res
                .status(201)
                .json({ message: "Success", chat: directMessage });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleDirectMessage = getSingleDirectMessage;
const sendDirectMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        const { chatId } = req.params;
        const { message } = req.body;
        console.log(message);
        const chat = yield directMessage_1.default.findOneAndUpdate({ _id: chatId }, {
            $push: {
                messages: {
                    userId: userId,
                    message: message,
                },
            },
            latestMessage: { userId: userId, message: message, createdAt: new Date() },
        });
        if (chat) {
            console.log(chat.latestMessage);
            return res.status(201).json({ message: 'Message sent successfully', chat });
        }
        if (!chat) {
            return res.status(400).json({ message: 'Message not sent' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendDirectMessage = sendDirectMessage;
const findExistingChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const loggedinUser = (_f = req.user) === null || _f === void 0 ? void 0 : _f.id;
        const { id } = req.params;
        const chat = yield directMessage_1.default.findOne({
            $or: [
                { userOne: loggedinUser, userTwo: id },
                { userOne: id, userTwo: loggedinUser },
            ],
        });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        return res.status(200).json({ chat });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.findExistingChat = findExistingChat;
