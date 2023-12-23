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
exports.saveVerified = void 0;
const verifiedUserModel_1 = __importDefault(require("../../models/verifiedUserModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const saveVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const verified = yield verifiedUserModel_1.default.create({
            userId: id,
            verified: true,
        });
        if (verified) {
            const user = userModel_1.default.findByIdAndUpdate({ _id: id }, {
                verified: true
            });
            if (!user) {
                return res.status(400).json({ message: "user Id not found" });
            }
            return res.status(201).json({ message: "Verified successfully" });
        }
        else {
            return res.status(404).json({ error: "Something went wrong" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.saveVerified = saveVerified;
