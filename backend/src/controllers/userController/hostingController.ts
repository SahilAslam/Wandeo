import { Request, Response } from "express";
import HostingModel from "../../models/hostingModel";
import userModel from "../../models/userModel";

const createHostingFacility = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }

        const { availableNights, noOfGuests, preferredGender, kidFriendly, petFriendly, smoking, sleepingArrangement, sleepingArrangementDescription, transportationAccess, whatCanIShare, additionalInformation } = req.body;

        const hosting = await HostingModel.findOneAndUpdate({ userId: userId }, {
            noOfGuests: noOfGuests,
            preferredGender: preferredGender,
            kidFriendly: kidFriendly,
            petFriendly: petFriendly,
            smoking: smoking,
            sleepingArrangement: sleepingArrangement,
            sleepingArrangementDescription: sleepingArrangementDescription,
            transportationAccess: transportationAccess,
            whatCanIShare: whatCanIShare,
            additionalInformation: additionalInformation
        })

        if (hosting) {
            return res.status(201).json({ message: "Saved your preferences" })
        } else {
            const createHosting = await HostingModel.create({
                userId: userId,
                noOfGuests: noOfGuests,
                preferredGender: preferredGender,
                kidFriendly: kidFriendly,
                petFriendly: petFriendly,
                smoking: smoking,
                sleepingArrangement: sleepingArrangement,
                sleepingArrangementDescription: sleepingArrangementDescription,
                transportationAccess: transportationAccess,
                whatCanIShare: whatCanIShare,
                additionalInformation: additionalInformation
            })
            if (createHosting) {
                const userData = await userModel.findById(userId);
                if (userData) {
                    userData.hostingId = createHosting._id
                    await userData.save();
                } else {
                    console.error("User data not found");
                    return res.status(404).json({ message: "User data not found" });
                }

                return res.status(201).json({ message: "Saved your preferences" })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getHostingFacility = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(404).json({ message: "UserId not found!" });
        }

        const hosting = await HostingModel.findOne({ userId: userId });

        console.log(hosting)

        if (hosting) {
            return res.status(201).json({ hosting })
        } else {
            return res.status(404).json({ message: "Coudnt find data! " })
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}


export { createHostingFacility, getHostingFacility, };