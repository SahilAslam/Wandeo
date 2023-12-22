import { Request, Response } from "express";
import VerifiedModel from "../../models/verifiedUserModel";
import userModel from "../../models/userModel";

export const saveVerified = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const verified = await VerifiedModel.create({
            userId: id,
            verified: true,
        })

        if(verified) {
            const user = userModel.findByIdAndUpdate({_id: id}, {
                verified: true
            });
            if(!user) {
                return res.status(400).json({message: "user Id not found"})
            }
            return res.status(201).json({message: "Verified successfully"})
        } else {
            return res.status(404).json({error: "Something went wrong"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}