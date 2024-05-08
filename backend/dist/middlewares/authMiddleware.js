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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json({ message: "Token not provided" });
        return;
    }
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            const userId = decoded.user_id;
            const user = yield userModel_1.default
                .findById(userId)
                .select("-password");
            if (user && (user === null || user === void 0 ? void 0 : user.isBlocked) === false) {
                req.user = user;
                next();
            }
            else if ((user === null || user === void 0 ? void 0 : user.isBlocked) === true) {
                res.status(401).json({ message: "User is blocked" });
                return;
            }
            else {
                res.status(404);
                throw new Error("User not found");
            }
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized or Invalid token");
        }
    }
}));
exports.protect = protect;
