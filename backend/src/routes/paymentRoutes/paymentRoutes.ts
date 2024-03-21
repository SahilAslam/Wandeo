import express from "express";
import { getVerified } from "../../controllers/paymentController/stripeController";
import { saveVerified } from "../../controllers/paymentController/paymentController";
const paymentRouter = express.Router();

paymentRouter.post('/stripe/create-checkout-session', getVerified);

paymentRouter.post('/getVerified/:id', saveVerified);


export default paymentRouter;