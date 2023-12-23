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
exports.createReference = void 0;
const userReferenceModel_1 = __importDefault(require("../../models/userReferenceModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const createReference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { targettedUserId } = req.params;
        console.log(targettedUserId);
        if (!targettedUserId) {
            return res.status(404).json({ error: "coudn't find Id get on params" });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log(userId);
        if (!userId) {
            return res.status(404).json({ message: "coudn't find userId" });
        }
        const { recommendYes, recommendNo, referenceMessage } = req.body;
        if (!req.body) {
            return res.status(404).json({ message: "No req body" });
        }
        const reference = yield userReferenceModel_1.default.create({
            userId: userId,
            targettedUserId: targettedUserId,
            recommendYes: recommendYes,
            recommendNo: recommendNo,
            referenceMessage: referenceMessage,
        });
        if (reference) {
            const user = yield userModel_1.default.findById(targettedUserId);
            if (user) {
                user.references.push(reference._id);
                yield user.save();
            }
        }
        return res.status(201).json({ message: "successfully add your reference" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createReference = createReference;
