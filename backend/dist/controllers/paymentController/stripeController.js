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
const stripeSecretKey = process.env.STRIPE_SECRET;
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2023-10-16",
});
const getVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: "Verification",
                            description: "Get verified and find host's 2x faster",
                            images: [
                                "https://res.cloudinary.com/dkba47utw/image/upload/b_rgb:FFFFFF/v1711016680/Wandeo_logo_main_c2oilb.png",
                            ],
                        },
                        unit_amount: 5000 * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://wandeo.website/paymentSuccess?success=true`,
            cancel_url: `http://wandeo.website/payment`,
        });
        res.send({ url: session.url });
    }
    catch (err) {
        console.error("Stripe Payment Error:", err);
        res.status(500).json({ error: "Payment error" });
    }
});
exports.getVerified = getVerified;
