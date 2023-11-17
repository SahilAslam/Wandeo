import { Request, Response } from "express";
import HostingModel from "../../models/hostingModel";

const createHostingFacility = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }

        const { availableNights, noOfGuests, preferredGender, sleepingArrangement, transportationAccess, whatCanIShare, additionalInformation } = req.body;

        const hosting = await HostingModel.findOneAndUpdate({userId: userId}, {
            noOfGuests: noOfGuests,
            preferredGender: preferredGender,
            sleepingArrangement: sleepingArrangement,
            transportationAccess: transportationAccess,
            whatCanIShare: whatCanIShare,
            additionalInformation: additionalInformation
        })

        if(hosting) {
            console.log(hosting);
            return res.status(201).json({message: "Saved your preferences"})
        } else {
            await HostingModel.create({
                userId: userId,
                noOfGuests: noOfGuests,
                preferredGender: preferredGender,
                sleepingArrangement: sleepingArrangement,
                transportationAccess: transportationAccess,
                whatCanIShare: whatCanIShare,
                additionalInformation: additionalInformation
            })
        }
     
        return res.status(201).json({message: "Saved your preferences"})
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

const getHostingFacility = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;

        if(!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }

        const hosting = await HostingModel.findOne({userId: userId});

        console.log(hosting)

        if(hosting) {
            return res.status(201).json({hosting})
        } else {
            return res.status(404).json({ message: "Coudnt find data! "})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
} 


export { createHostingFacility, getHostingFacility, };