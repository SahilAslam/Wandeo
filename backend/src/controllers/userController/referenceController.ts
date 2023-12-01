import { Request, Response } from "express";
import ReferenceModel from "../../models/userReferenceModel";
import userModel from "../../models/userModel";

export const createReference = async (req: Request, res: Response) => {
    try {
        const {targettedUserId} = req.params;
        console.log(targettedUserId)

        if(!targettedUserId) {
            return res.status(404).json({error: "coudn't find Id get on params"})
        }

        const userId = req.user?.id
        console.log(userId)

        if(!userId) {
            return res.status(404).json({message: "coudn't find userId"})
        }

        const {recommendYes, recommendNo, referenceMessage} = req.body;

        if(!req.body) {
            return res.status(404).json({message: "No req body"})
        }

        const reference = await ReferenceModel.create({
            userId: userId,
            targettedUserId: targettedUserId,
            recommendYes: recommendYes,
            recommendNo: recommendNo,
            referenceMessage: referenceMessage,
        })

        if(reference) {
            const user = await userModel.findById(targettedUserId);
            if(user) {
                user.references.push(reference._id);
                await user.save();
            }
        }

        return res.status(201).json({message: "successfully add your reference"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}