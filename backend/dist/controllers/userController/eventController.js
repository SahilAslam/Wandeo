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
exports.leaveUserEvent = exports.getEventDetailedPage = exports.eventUsersAttending = exports.joinUserEvent = exports.getUserEvent = exports.createUserEvent = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel"));
const createUserEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { eventName, location, startDate, endDate, attendeesLimit, image, description, } = req.body;
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Not found" });
        }
        const event = yield eventModel_1.default.create({
            organizedBy: user._id,
            eventName,
            location,
            startDate,
            endDate,
            attendeesLimit,
            image,
            description,
        });
        if (event) {
            res.status(201).json({ message: "Event created successfully" });
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "An error occured while creating event" });
    }
});
exports.createUserEvent = createUserEvent;
const getUserEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const events = yield eventModel_1.default.find({
            startDate: { $gte: currentDate },
        }).exec();
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No upcoming events found" });
        }
        return res.status(200).json({ message: events });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserEvent = getUserEvent;
const joinUserEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "No user found" });
        }
        const event = yield eventModel_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "No event found" });
        }
        if (event.attendees.includes(user.id)) {
            return res
                .status(400)
                .json({ error: "User is already attending this event" });
        }
        if (event.attendees.length >= event.attendeesLimit) {
            return res.status(400).json({ error: "Event is full, cannot join" });
        }
        event.attendees.push(user === null || user === void 0 ? void 0 : user.id);
        yield event.save();
        const userData = yield userModel_1.default.findById(user.id);
        if (userData) {
            userData.eventsAttending.push(event._id);
            yield userData.save();
        }
        else {
            console.error("User data not found");
        }
        return res
            .status(200)
            .json({ message: "User joined the event successfully" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.joinUserEvent = joinUserEvent;
const leaveUserEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.eventId;
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "No user found" });
        }
        const event = yield eventModel_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found!" });
        }
        if (!event.attendees.includes(user.id)) {
            return res
                .status(400)
                .json({ error: "User is not attending this event" });
        }
        event.attendees = event.attendees.filter((userId) => userId.toString() !== user.id.toString());
        yield event.save();
        const userData = yield userModel_1.default.findById(user.id);
        if (userData) {
            userData.eventsAttending = userData.eventsAttending.filter((eventId) => eventId.toString() !== event._id.toString());
            yield userData.save();
        }
        else {
            console.error("User data not found");
        }
        return res
            .status(200)
            .json({ message: "User left the event successfully" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.leaveUserEvent = leaveUserEvent;
const eventUsersAttending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentDate = new Date();
        const user = yield userModel_1.default.findById(id)
            .populate({
            path: "eventsAttending",
            match: { startDate: { $gte: currentDate } }
        });
        if (!user) {
            return res
                .status(404)
                .json({ error: "Couldn't find the user with the specified Id" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.eventUsersAttending = eventUsersAttending;
const getEventDetailedPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield eventModel_1.default.findById(id)
            .populate("organizedBy", "name")
            .populate("attendees");
        if (!event) {
            res.status(404).json({ error: "Event not found!" });
        }
        else {
            res.status(200).json({ event });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getEventDetailedPage = getEventDetailedPage;
