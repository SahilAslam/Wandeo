import { Request, Response } from "express";
import userModel from "../../models/userModel";
import HostingModel from "../../models/hostingModel";

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const user = await userModel.findById(userId).populate("groups").populate("hostingId").populate({
            path: 'references',
            populate: {
                path: 'userId',
                model: 'userCollection',
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        
        return res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const editUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const {
            hostingAvailability,
            name,
            dateOfBirth,
            gender,
            email,
            phone,
            address,
            occupation,
            education,
            about,
            languagesFluentIn,
            languagesLearning,
        } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Not found" });
        }

        user.hostingAvailability = hostingAvailability;
        user.name = name;
        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.occupation = occupation;
        user.education = education;
        user.about = about;
        user.languagesFluentIn = languagesFluentIn;
        user.languagesLearning = languagesLearning;

        await user.save();

        if (hostingAvailability !== "") {
            const hosting = await HostingModel.findOneAndUpdate(
                { userId: userId },
                {
                    hostingAvailability: hostingAvailability,
                }
            );
            if (!hosting) {
                const createHosting = await HostingModel.create({
                    userId: userId,
                    hostingAvailability: hostingAvailability,
                });
                if (createHosting) {
                    user.hostingId = createHosting._id;
                    await user.save();
                }
            }
        }

        return res
            .status(200)
            .json({ message: "Profile updated successfully", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addProfileImage = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const { image } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ error: "No user found with the id" });
        }

        userData.profileImage = image;
        await userData.save();

        res.status(200).json({ message: "Succefully uploaded Image" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { getUserProfile, editUserProfile, addProfileImage };
