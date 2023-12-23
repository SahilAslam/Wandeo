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
exports.getVerified = void 0;
const stripe_1 = __importDefault(require("stripe"));
const verifiedUserModel_1 = __importDefault(require("../../models/verifiedUserModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const stripeSecretKey = process.env.STRIPE_SECRET;
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2023-10-16",
});
const getVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, "body");
        const { userId } = req.body;
        const session = yield stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: "Verified"
                        },
                        unit_amount: 5000 * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/paymentSuccess`,
            cancel_url: `http://localhost:5173/payment`,
        });
        if (session.payment_status === "unpaid") {
            const verified = yield verifiedUserModel_1.default.create({
                userId: userId,
                verified: true,
            });
            if (verified) {
                const user = yield userModel_1.default.findByIdAndUpdate({ _id: userId }, {
                    verified: true
                });
                if (!user) {
                    return res.status(400).json({ message: "user not updated" });
                }
                console.log(user);
                res.json({ url: session.url });
            }
            else {
                return res.status(404).json({ error: "Something went wrong" });
            }
        }
        else {
            res.status(400).json({ error: "Verification not completed yet." });
        }
        res.send({ url: session.url });
    }
    catch (err) {
        console.error("Stripe Payment Error:", err);
        res.status(500).json({ error: "Payment error" });
    }
});
exports.getVerified = getVerified;
