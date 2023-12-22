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
exports.postDiscussionReply = exports.getSingleDiscussion = exports.createNewDiscussion = void 0;
const groupModel_1 = __importDefault(require("../../models/groupModel"));
const discussionModel_1 = __importDefault(require("../../models/discussionModel"));
const createNewDiscussion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { groupId } = req.params;
        const group = yield groupModel_1.default.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found!" });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }
        const { title, content } = req.body;
        const discussion = yield discussionModel_1.default.create({
            userId: userId,
            title: title,
            content: content,
            groupId: groupId,
        });
        if (discussion) {
            group.discussions.push(discussion._id);
            yield group.save();
            return res
                .status(201)
                .json({ message: "Discussion created successfully" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createNewDiscussion = createNewDiscussion;
const getSingleDiscussion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { discussionId } = req.params;
        console.log(discussionId);
        const discussion = yield discussionModel_1.default.findById(discussionId)
            .populate("userId")
            .populate({
            path: "groupId",
            select: "name",
        })
            .populate({
            path: "replies.userId",
            select: "name profileImage address",
        });
        if (discussion) {
            console.log(discussion);
            return res.status(201).json({ discussion });
        }
        else {
            return res.status(404).json({ message: "Discussion not found!" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleDiscussion = getSingleDiscussion;
const postDiscussionReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { discussionId } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const { replyMessage } = req.body;
        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }
        if (!replyMessage) {
            return res.status(400).json({ message: "Reply message is required!" });
        }
        const discussion = yield discussionModel_1.default.findOneAndUpdate({ _id: discussionId }, {
            $push: {
                replies: {
                    userId: userId,
                    replyMessage: replyMessage,
                },
            },
        }, { new: true });
        if (!discussion) {
            return res.status(400).json({ message: "Discussion not found!" });
        }
        return res.status(201).json({ message: "Successfully posted reply" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.postDiscussionReply = postDiscussionReply;
