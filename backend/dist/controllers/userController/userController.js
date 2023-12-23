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
exports.createUserInfo = exports.userLogout = exports.newPassword = exports.verifyForgetPassword = exports.sendPasswordLink = exports.googleLogin = exports.googleSignup = exports.userLogin = exports.userSignup = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodeMailer_1 = require("../../middlewares/nodeMailer");
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, createdAt } = req.body;
        console.log(req.body);
        const existingEmail = yield userModel_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = yield userModel_1.default.create({
            name,
            username,
            email,
            password,
            createdAt,
        });
        if (user) {
            const token = (0, generateToken_1.default)(user._id);
            console.log(token);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occured during Signup" });
    }
});
exports.userSignup = userSignup;
const createUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { dateOfBirth, gender, address, } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Not found" });
        }
        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.address = address;
        yield user.save();
        return res
            .status(200)
            .json({ message: "Profile created successfully", user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUserInfo = createUserInfo;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailOrUsername, password } = req.body;
        const user = yield userModel_1.default.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });
        if (!user) {
            return res.status(401).json({ message: "User not Found" });
        }
        if ((user === null || user === void 0 ? void 0 : user.isBlocked) === true) {
            return res.status(401).json({ message: "User is blocked" });
        }
        if (user && (yield user.matchPassword(password))) {
            user.isLoggin = "Active Now";
            user.markModified('isLoggin');
            yield user.save();
            const token = (0, generateToken_1.default)(user._id);
            return res.status(201).json({ user, token });
        }
        else {
            return res.status(401).json({ message: "Invalid Email and Password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "server Error on user login" });
    }
});
exports.userLogin = userLogin;
const googleSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.credential;
        const decodedData = jsonwebtoken_1.default.decode(token);
        if (!decodedData || typeof decodedData !== 'object') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const { name, email, picture, jti } = decodedData;
        if (!name || !email || !picture || !jti) {
            return res.status(401).json({ error: 'Invalid token payload' });
        }
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(401).json({ error: 'User Already Exist' });
        }
        const newUser = new userModel_1.default({
            name,
            email,
            profileImage: picture,
            password: jti,
        });
        yield newUser.save();
        res.status(201).json({ message: 'user saved successfully', newUser });
    }
    catch (error) {
        next(error);
    }
});
exports.googleSignup = googleSignup;
const googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.credential;
        const decodedData = jsonwebtoken_1.default.decode(token);
        console.log(decodedData, "dedede");
        if (!decodedData || typeof decodedData !== 'object') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const { name, email, picture, jti } = decodedData;
        if (!name || !email || !picture || !jti) {
            return res.status(401).json({ error: 'Invalid token payload' });
        }
        const user = yield userModel_1.default.findOne({ email: email });
        console.log("userData: ", user);
        if (user) {
            if (user.isBlocked) {
                return res.status(401).json({ error: 'Account is blocked' });
            }
            user.isLoggin = "Active Now";
            user.markModified('isLoggin');
            yield user.save();
            const usertoken = jsonwebtoken_1.default.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.status(200).json({ message: 'Login Successfull', usertoken,
                userData: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profileImage: picture
                } });
        }
        else {
            res.status(401).json({ error: 'User not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.googleLogin = googleLogin;
const forgetData = {
    otp: null,
};
const sendPasswordLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log(email);
        if (!email) {
            res.status(401).json({ message: "Enter Your Email" });
        }
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const otp = (0, nodeMailer_1.sendMail)(email, res);
            forgetData.otp = otp;
        }
        else {
            return res.status(400).json({ message: "no user " });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendPasswordLink = sendPasswordLink;
const verifyForgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        if (otp == forgetData.otp) {
            return res.status(200).json({ message: "success" });
        }
        else {
            return res.status(400).json({ message: "please correct passowrd" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyForgetPassword = verifyForgetPassword;
const newPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        userModel_1.default.findOne({ email: email }).then((user) => {
            const saltRounds = 10;
            bcrypt_1.default.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while hashing the password",
                    });
                }
                else {
                    userModel_1.default
                        .findOneAndUpdate({ email: email }, { password: hash })
                        .then((data) => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update user with ID: ${email}. User not found.`,
                            });
                        }
                        else {
                            res.status(200).send({
                                message: "Successfully updated password",
                            });
                        }
                    })
                        .catch((err) => {
                        res
                            .status(500)
                            .send({ message: "Error updating user information" });
                    });
                }
            });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred" });
    }
});
exports.newPassword = newPassword;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(404).json({ message: "userId not found!" });
        }
        const userData = yield userModel_1.default.findById(userId);
        if (userData) {
            userData.isLoggin = "";
            userData.lastLogin = new Date();
            userData.markModified('lastLogin', 'isLoggin');
            yield userData.save();
            return res.status(201).json({ message: "Successfully updated lastLogin" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.userLogout = userLogout;
