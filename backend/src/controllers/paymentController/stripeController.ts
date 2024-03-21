import { Request, Response } from "express";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

const getVerified = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
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
      // success_url: `http://localhost:5173/paymentSuccess?success=true`,
      success_url: `http://wandeo.website/paymentSuccess?success=true`,
      // cancel_url: `http://localhost:5173/payment`,
      cancel_url: `http://wandeo.website/payment`,
    });
  
    res.send({ url: session.url });

  } catch (err) {
    console.error("Stripe Payment Error:", err);
    res.status(500).json({ error: "Payment error" });
  }
};

export { getVerified };
