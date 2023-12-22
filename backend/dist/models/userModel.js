"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    occupation: {
        type: String,
    },
    education: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    location: {
        type: String
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String
    },
    propImages: [
        {
            type: String,
        }
    ],
    languagesFluentIn: {
        type: String
    },
    languagesLearning: {
        type: String
    },
    countriesLivedIn: [
        {
            type: String
        }
    ],
    countriesVisited: [
        {
            type: String
        }
    ],
    hostingId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Hosting'
    },
    hostingAvailability: {
        type: String,
        default: "Maybe Accepting Guests"
    },
    publicTrips: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'PublicTrip',
        }
    ],
    eventsAttending: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Event',
        }
    ],
    groups: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Group",
        },
    ],
    friends: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "userCollection"
        }
    ],
    references: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "UserReference"
        },
    ],
    verified: {
        type: Boolean,
        default: false,
    },
    isLoggin: {
        type: String,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
const userModel = (0, mongoose_1.model)("userCollection", userSchema);
exports.default = userModel;
