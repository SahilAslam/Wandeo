import { Request, Response } from "express";
import Stripe from "stripe";
import VerifiedModel from "../../models/verifiedUserModel";
import userModel from "../../models/userModel";

const stripeSecretKey = process.env.STRIPE_SECRET as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

const getVerified = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "body");
    const { userId } = req.body
    const session = await stripe.checkout.sessions.create({
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
      // success_url: `http://localhost:5173/paymentSuccess`,
      success_url: `http://wandeo.website/paymentSuccess`,
      // cancel_url: `http://localhost:5173/payment`,
      cancel_url: `http://wandeo.website/payment`,
    });
  
    if (session.payment_status === "unpaid") {
      const verified = await VerifiedModel.create({
        userId: userId,
        verified: true,
      })

      if(verified) {
          const user = await userModel.findByIdAndUpdate({_id: userId}, {
              verified: true
          });

          if(!user) {
              return res.status(400).json({message: "user not updated"})
          }
          console.log(user)
          res.json({ url: session.url});
      } else {
          return res.status(404).json({error: "Something went wrong"})
      }
    } else {
      res.status(400).json({ error: "Verification not completed yet." });
    }
   
    res.send({ url: session.url });

  } catch (err) {
    console.error("Stripe Payment Error:", err);
    res.status(500).json({ error: "Payment error" });
  }
};

export { getVerified };
