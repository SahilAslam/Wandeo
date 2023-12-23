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
exports.getOtherUserTrips = exports.getPublicTrips = exports.createPublicTrip = void 0;
const publicTripModel_1 = __importDefault(require("../../models/publicTripModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const createPublicTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }
        const { destination, arrivalDate, departureDate, noOfTravelers, description, } = req.body;
        if (!req.body) {
            return res.status(404).json({ message: "No data found on body" });
        }
        const publicTrip = yield publicTripModel_1.default.create({
            userId: userId,
            destination: destination,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            noOfTravelers: noOfTravelers,
            description: description,
        });
        if (publicTrip) {
            const userData = yield userModel_1.default.findById(userId);
            if (userData) {
                userData.publicTrips.push(publicTrip._id);
                yield userData.save();
            }
            else {
                console.error("User data not found");
                return res.status(404).json({ message: "User data not found" });
            }
            return res
                .status(201)
                .json({ message: "Created Public trip Successfully" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPublicTrip = createPublicTrip;
const getPublicTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const today = new Date();
        const publicTrips = yield publicTripModel_1.default.find({
            userId: userId,
            arrivalDate: { $gte: today },
        });
        if (publicTrips) {
            return res.status(201).json({ message: "Success", publicTrips });
        }
        else {
            return res.status(404).json({ message: "Coudn't find publicTrips" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getPublicTrips = getPublicTrips;
const getOtherUserTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const today = new Date();
        const publicTrips = yield publicTripModel_1.default.find({
            userId: id,
            arrivalDate: { $gte: today },
        });
        if (publicTrips) {
            return res.status(201).json({ message: "Success", publicTrips });
        }
        else {
            return res.status(404).json({ message: "Coudn't find publicTrips" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getOtherUserTrips = getOtherUserTrips;
