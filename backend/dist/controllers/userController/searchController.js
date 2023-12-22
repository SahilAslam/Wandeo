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
exports.fetchTavelers = exports.getSearchedUsers = exports.listHostingUsers = exports.listGroups = void 0;
const groupModel_1 = __importDefault(require("../../models/groupModel"));
const hostingModel_1 = __importDefault(require("../../models/hostingModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const publicTripModel_1 = __importDefault(require("../../models/publicTripModel"));
const listGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield groupModel_1.default.find();
        if (!groups || groups.length === 0) {
            return res.status(400).json({ error: "No users found" });
        }
        res.status(201).json({ message: "success", groups });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.listGroups = listGroups;
const listHostingUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const loggedinUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const hosts = yield hostingModel_1.default.find({
            userId: { $ne: loggedinUser },
        }).populate({
            path: "userId",
            populate: {
                path: "groups",
                model: "Group",
            },
        });
        if (!hosts || hosts.length === 0) {
            return res.status(400).json({ error: "No hosters found" });
        }
        res.status(201).json({ message: "Success", hosts });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.listHostingUsers = listHostingUsers;
const getSearchedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const users = yield userModel_1.default.find({
            isBlocked: false,
            _id: { $ne: userId },
        });
        if (users) {
            return res.status(201).json({ users });
        }
        else {
            return res.status(404).json({ message: "Coudn't find users" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSearchedUsers = getSearchedUsers;
const fetchTavelers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const loggedinUser = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const currentDate = new Date();
        const travelers = yield publicTripModel_1.default.find({
            userId: { $ne: loggedinUser },
            departureDate: { $gte: currentDate },
        }).populate("userId");
        res.status(201).json({ message: "Success", travelers });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchTavelers = fetchTavelers;
