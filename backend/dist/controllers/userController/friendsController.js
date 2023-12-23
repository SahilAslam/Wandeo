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
exports.addFriend = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { targettedUserId, userId } = req.body;
        console.log("body:", targettedUserId, userId);
        if (!userId) {
            return res.status(400).json({ error: 'User ID is missing or invalid' });
        }
        const myModel = yield userModel_1.default.findById(userId);
        if (myModel && myModel.friends.indexOf(targettedUserId) === -1) {
            myModel.friends.push(targettedUserId);
            yield myModel.save();
            const friendModel = yield userModel_1.default.findById(targettedUserId);
            if (friendModel) {
                friendModel.friends.push(userId);
                yield friendModel.save();
            }
        }
        else {
            return res.status(400).json({ message: "You are already a friend." });
        }
        return res.status(201).json({ message: "added to friends successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addFriend = addFriend;
