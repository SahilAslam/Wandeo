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
exports.propertyImage = exports.addProfileImage = exports.editUserProfile = exports.getUserProfile = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const hostingModel_1 = __importDefault(require("../../models/hostingModel"));
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userModel_1.default.findById(userId).populate("groups").populate("hostingId").populate("friends").populate("publicTrips").populate({
            path: 'references',
            populate: {
                path: 'userId',
                model: 'userCollection',
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        return res.status(201).json({ user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserProfile = getUserProfile;
const editUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { hostingAvailability, name, dateOfBirth, gender, email, phone, address, occupation, education, about, languagesFluentIn, languagesLearning, } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Not found" });
        }
        user.hostingAvailability = hostingAvailability;
        user.name = name;
        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.occupation = occupation;
        user.education = education;
        user.about = about;
        user.languagesFluentIn = languagesFluentIn;
        user.languagesLearning = languagesLearning;
        yield user.save();
        if (hostingAvailability !== "") {
            const hosting = yield hostingModel_1.default.findOneAndUpdate({ userId: userId }, {
                hostingAvailability: hostingAvailability,
            });
            if (!hosting) {
                const createHosting = yield hostingModel_1.default.create({
                    userId: userId,
                    hostingAvailability: hostingAvailability,
                });
                if (createHosting) {
                    user.hostingId = createHosting._id;
                    yield user.save();
                }
            }
        }
        return res
            .status(200)
            .json({ message: "Profile updated successfully", user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editUserProfile = editUserProfile;
const addProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { image } = req.body;
        const userData = yield userModel_1.default.findById(userId);
        if (!userData) {
            return res.status(404).json({ error: "No user found with the id" });
        }
        userData.profileImage = image;
        yield userData.save();
        res.status(200).json({ message: "Succefully uploaded Image" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.addProfileImage = addProfileImage;
const propertyImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { image } = req.body;
        if (!req.body) {
            return res.status(404).json({ message: "No image received" });
        }
        const userData = yield userModel_1.default.findById(userId);
        if (!userData) {
            return res.status(404).json({ error: "No user found with the id" });
        }
        userData.propImages.push(image);
        yield userData.save();
        res.status(200).json({ message: "Succefully uploaded Image" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.propertyImage = propertyImage;
