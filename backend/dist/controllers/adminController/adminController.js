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
exports.unblockGroup = exports.blockGroup = exports.getHosts = exports.getEvents = exports.getGroups = exports.findUsers = exports.adminDashboard = exports.unblockUser = exports.blockUser = exports.getUsers = exports.adminLogin = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const groupModel_1 = __importDefault(require("../../models/groupModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel"));
const hostingModel_1 = __importDefault(require("../../models/hostingModel"));
const verifiedUserModel_1 = __importDefault(require("../../models/verifiedUserModel"));
const cred = JSON.parse(process.env.ADMIN_CRED);
const adminCred = {
    Email: cred.EMAIL,
    username: cred.USERNAME,
    Password: cred.PASSWORD,
    Id: cred.ID
};
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernameOrEmail, password } = req.body;
        if (usernameOrEmail === adminCred.username || usernameOrEmail === adminCred.Email) {
            if (password !== adminCred.Password) {
                return res.status(400).json({ message: "Invalid Password" });
            }
            const user_id = adminCred.Id;
            const token = jsonwebtoken_1.default.sign({ user_id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });
            res.status(200).json({ message: "Login successfull", adminCred, token });
        }
        else {
            return res.status(400).json({ message: "Admin does not exists!" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Admin login error" });
    }
});
exports.adminLogin = adminLogin;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find().exec();
        if (users) {
            console.log(users);
            res.status(200).json({
                users
            });
        }
        else {
            return res.status(400).json({
                message: "Couldn't find the users"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsers = getUsers;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updateUser = yield userModel_1.default.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
        if (!updateUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: `Blocked ${updateUser.name}`, user: updateUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.blockUser = blockUser;
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updateUser = yield userModel_1.default.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
        if (!updateUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: `Unblocked ${updateUser.name}` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.unblockUser = unblockUser;
const adminDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const totalUsers = yield userModel_1.default.countDocuments();
        const totalVerifiedUsers = yield verifiedUserModel_1.default.countDocuments();
        const totalGroups = yield groupModel_1.default.countDocuments();
        const eventsGoingOn = yield eventModel_1.default.countDocuments({
            endDate: { $gte: currentDate },
        });
        const userMonthlyCounts = new Array(12).fill(0);
        const verifiedMonthlyCounts = new Array(12).fill(0);
        const users = yield userModel_1.default.find();
        const verifiedUsers = yield verifiedUserModel_1.default.find();
        users.forEach((user) => {
            const userJoinedDate = new Date(user.createdAt);
            const userJoinedMonth = userJoinedDate.getMonth();
            const userJoinedYear = userJoinedDate.getFullYear();
            if (userJoinedYear === currentYear) {
                userMonthlyCounts[userJoinedMonth]++;
            }
        });
        verifiedUsers.forEach((user) => {
            const verifiedDate = new Date(user.createdAt);
            const verifiedMonth = verifiedDate.getMonth();
            const verifiedYear = verifiedDate.getFullYear();
            if (verifiedYear === currentYear) {
                verifiedMonthlyCounts[verifiedMonth]++;
            }
        });
        console.log(userMonthlyCounts, "ddddddddddddddddd");
        return res.status(201).json({ totalUsers, userMonthlyCounts, totalVerifiedUsers, verifiedMonthlyCounts, totalGroups, eventsGoingOn });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.adminDashboard = adminDashboard;
const findUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        if (users) {
            return res.status(201).json({ messsage: 'success', users });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.findUsers = findUsers;
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield groupModel_1.default.find();
        if (groups) {
            return res.status(201).json({ message: "success", groups });
        }
        else {
            return res.status(404).json({ message: "Coudn't get groups" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getGroups = getGroups;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const events = yield eventModel_1.default.find({ endDate: { $gte: currentDate } });
        if (events) {
            return res.status(201).json({ message: "success", events });
        }
        else {
            return res.status(404).json({ message: "Coudn't get events" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getEvents = getEvents;
const getHosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hosts = yield hostingModel_1.default.find().populate("userId");
        if (hosts) {
            return res.status(201).json({ message: "success", hosts });
        }
        else {
            return res.status(404).json({ message: "Coudn't get hosts" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getHosts = getHosts;
const blockGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/////////////////////');
    try {
        const groupId = req.params.id;
        const updateGroup = yield groupModel_1.default.findByIdAndUpdate(groupId, { isBlocked: true }, { new: true });
        if (!updateGroup) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: `Blocked ${updateGroup.name}` });
    }
    catch (error) {
        console.log(error);
    }
});
exports.blockGroup = blockGroup;
const unblockGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = req.params.id;
        const updateGroup = yield groupModel_1.default.findByIdAndUpdate(groupId, { isBlocked: false }, { new: true });
        if (!updateGroup) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: `Unblocked ${updateGroup.name}` });
    }
    catch (error) {
        console.log(error);
    }
});
exports.unblockGroup = unblockGroup;
