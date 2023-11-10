import { Request, Response } from "express";
import userModel from "../../models/userModel";


const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        console.log(userId);
        
        const user = await userModel.findById(userId)

        if(!user) {
            return res.status(404).json({message: "User not found!"})
        }

        return res.status(201).json({user})
       
    } catch (error) {
        console.error(error);
        
    }
}

const editUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        console.log(userId);
        
        const { hostingAvailability, name, dateOfBirth, gender, email, phone, address, occupation, education, about, languagesFluentIn, languagesLearning } = req.body;

        const user = await userModel.findById(userId);
  
        if(!user){
            return res.status(404).json({message : 'Not found'});
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
    
        return res.status(200).json({ message: 'Profile updated successfully', user });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error on editUserProfile"})       
    }
}

const addProfileImage = async (req: Request, res: Response) => {
    try {
        
        const userId = req.params.userId;
        console.log(userId);
        
        const {image} = req.body

        const userData = await userModel.findById(userId);

        if(!userData) {
            return res.status(404).json({error: "No user found with the id"})
        }

        userData.profileImage = image;
        await userData.save();

        res.status(200).json({message: "Succefully uploaded Image"})
    } catch (error) {
        console.error(error);
        
    }
}

export { getUserProfile, editUserProfile, addProfileImage }