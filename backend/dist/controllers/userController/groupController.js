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
exports.deleteUserGroup = exports.getPopularGroup = exports.userJoinedGroup = exports.leaveUserGroup = exports.joinUserGroup = exports.getGroupDetailedPage = exports.getUserGroup = exports.createUserGroup = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const groupModel_1 = __importDefault(require("../../models/groupModel"));
const createUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, description, location, image } = req.body;
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not Found!" });
        }
        const group = yield groupModel_1.default.create({
            createdBy: user._id,
            name: name,
            description: description,
            location: location,
            image: image,
            members: user._id,
        });
        if (group) {
            user.groups.push(group._id);
            yield user.save();
            return res.status(201).json({ message: "Group created successfully" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createUserGroup = createUserGroup;
const getUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield groupModel_1.default.find({ isBlocked: false }).exec();
        if (group) {
            return res.status(201).json({ group });
        }
        else {
            return res.status(404).json({ message: "Coudn't find groups!" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
});
exports.getUserGroup = getUserGroup;
const getPopularGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularGroups = yield groupModel_1.default.aggregate([
            {
                $match: { isBlocked: { $ne: true } }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    location: 1,
                    image: 1,
                    createdBy: 1,
                    discussions: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    memberCount: { $size: "$members" }
                }
            },
            { $sort: { memberCount: -1 } },
            { $limit: 3 }
        ]).exec();
        if (popularGroups.length > 0) {
            return res.status(200).json({ popularGroups });
        }
        else {
            return res.status(404).json({ message: "Couldn't find the most popular groups!" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
});
exports.getPopularGroup = getPopularGroup;
const getGroupDetailedPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = req.params.groupId;
        const group = yield groupModel_1.default.findById(groupId)
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
        }
        else {
            res.status(404).json({ message: "Coudn't find group" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getGroupDetailedPage = getGroupDetailedPage;
const joinUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const groupId = req.params.groupId;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(404).json({ error: "UserId not found!" });
        }
        const group = yield groupModel_1.default.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found!" });
        }
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: "You are already a Member" });
        }
        group.members.push(userId);
        yield group.save();
        const userData = yield userModel_1.default.findById(userId);
        if (userData) {
            userData.groups.push(group._id);
            yield userData.save();
        }
        else {
            console.error("User data not found");
            return res.status(404).json({ message: "User data not found" });
        }
        return res.status(201).json({ message: "Joined Successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.joinUserGroup = joinUserGroup;
const leaveUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { groupId } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!userId) {
            return res.status(404).json({ error: "UserId not found!" });
        }
        const group = yield groupModel_1.default.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found!" });
        }
        if (!group.members.includes(userId)) {
            return res.status(400).json({ message: "You are not a member" });
        }
        group.members = group.members.filter((id) => id.toString() !== userId.toString());
        yield group.save();
        const user = yield userModel_1.default.findById(userId);
        if (user) {
            user.groups = user.groups.filter((groupId) => groupId.toString() !== group._id.toString());
            yield user.save();
        }
        else {
            console.error("User data not found");
            return res.status(404).json({ message: "User data not found" });
        }
        return res.status(201).json({ message: "Leaved Group" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.leaveUserGroup = leaveUserGroup;
const userJoinedGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userModel_1.default.findById(userId).populate("groups");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        return res.status(201).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});
exports.userJoinedGroup = userJoinedGroup;
const deleteUserGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { groupId } = req.params;
        if (!groupId) {
            return res.status(404).json({ message: "groupId not found!" });
        }
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!userId) {
            return res.status(404).json({ message: "userId not found!" });
        }
        const group = yield groupModel_1.default.findByIdAndDelete(groupId);
        if (group) {
            yield userModel_1.default.updateMany({ groups: groupId }, { $pull: { groups: groupId } });
        }
        return res.status(201).json({ message: "Deleted Group" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
});
exports.deleteUserGroup = deleteUserGroup;
