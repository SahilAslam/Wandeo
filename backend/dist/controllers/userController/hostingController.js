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
exports.findExistingHostingChat = exports.sendSimpleMessage = exports.requestForHosting = exports.hostAUser = exports.getHostingFacility = exports.createHostingFacility = void 0;
const hostingModel_1 = __importDefault(require("../../models/hostingModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const hostingAndTravelingModel_1 = __importDefault(require("../../models/hostingAndTravelingModel"));
const createHostingFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }
        const { availableNights, noOfGuests, preferredGender, kidFriendly, petFriendly, smoking, sleepingArrangement, sleepingArrangementDescription, transportationAccess, whatCanIShare, additionalInformation, } = req.body;
        const hosting = yield hostingModel_1.default.findOneAndUpdate({ userId: userId }, {
            noOfGuests: noOfGuests,
            preferredGender: preferredGender,
            kidFriendly: kidFriendly,
            petFriendly: petFriendly,
            smoking: smoking,
            sleepingArrangement: sleepingArrangement,
            sleepingArrangementDescription: sleepingArrangementDescription,
            transportationAccess: transportationAccess,
            whatCanIShare: whatCanIShare,
            additionalInformation: additionalInformation,
        });
        if (hosting) {
            return res.status(201).json({ message: "Saved your preferences" });
        }
        else {
            const createHosting = yield hostingModel_1.default.create({
                userId: userId,
                noOfGuests: noOfGuests,
                preferredGender: preferredGender,
                kidFriendly: kidFriendly,
                petFriendly: petFriendly,
                smoking: smoking,
                sleepingArrangement: sleepingArrangement,
                sleepingArrangementDescription: sleepingArrangementDescription,
                transportationAccess: transportationAccess,
                whatCanIShare: whatCanIShare,
                additionalInformation: additionalInformation,
            });
            if (createHosting) {
                const userData = yield userModel_1.default.findById(userId);
                if (userData) {
                    userData.hostingId = createHosting._id;
                    yield userData.save();
                }
                else {
                    console.error("User data not found");
                    return res.status(404).json({ message: "User data not found" });
                }
                return res.status(201).json({ message: "Saved your preferences" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createHostingFacility = createHostingFacility;
const getHostingFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }
        const hosting = yield hostingModel_1.default.findOne({ userId: userId });
        console.log(hosting);
        if (hosting) {
            return res.status(201).json({ hosting });
        }
        else {
            return res.status(404).json({ message: "Coudnt find data! " });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getHostingFacility = getHostingFacility;
const hostAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { targettedUserId } = req.params;
        const { arrivalDate, departureDate, noOfTravelers, message } = req.body;
        const host = yield hostingAndTravelingModel_1.default.create({
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            noOfTravelers: noOfTravelers,
            messages: [{ userId: userId, message: message, createdAt: new Date() }],
            hostingUser: userId,
            requestingUser: targettedUserId,
            response: "Accepted",
            latestMessage: {
                userId: userId,
                message: message,
                createdAt: new Date(),
            },
        });
        if (host) {
            return res.status(201).json({ message: "Saved successfully", host });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.hostAUser = hostAUser;
const requestForHosting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const { targettedUserId } = req.params;
        const { arrivalDate, departureDate, noOfTravelers, message } = req.body;
        const host = yield hostingAndTravelingModel_1.default.create({
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            noOfTravelers: noOfTravelers,
            messages: [{ userId: userId, message: message, createdAt: new Date() }],
            hostingUser: targettedUserId,
            requestingUser: userId,
            latestMessage: {
                userId: userId,
                message: message,
                createdAt: new Date(),
            },
        });
        if (host) {
            return res.status(201).json({ message: "Saved successfully", host });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.requestForHosting = requestForHosting;
const sendSimpleMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const { chatId } = req.params;
        const { message } = req.body;
        const chat = yield hostingAndTravelingModel_1.default.findOneAndUpdate({ _id: chatId }, {
            $push: {
                messages: {
                    userId: userId,
                    message: message,
                },
            },
            latestMessage: {
                userId: userId,
                message: message,
                createdAt: new Date(),
            },
        });
        if (!chat) {
            console.log(chat);
            return res.status(400).json({ message: "Message not sent" });
        }
        return res
            .status(201)
            .json({ message: "Message sent successfully", chat: chat });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendSimpleMessage = sendSimpleMessage;
const findExistingHostingChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const loggedinUser = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        const { id } = req.params;
        const chat = yield hostingAndTravelingModel_1.default.findOne({
            $or: [
                { hostingUser: loggedinUser, requestingUser: id },
                { requestingUser: loggedinUser, hostingUser: id },
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
exports.findExistingHostingChat = findExistingHostingChat;
