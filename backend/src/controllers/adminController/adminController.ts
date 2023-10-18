import { Request, Response } from "express"
import generateToken from "../../utils/generateToken";
import userModel from "../../models/userModel";

const adminCred = {
    Email: "admin@gmail.com",
    Password: "admin123",
    Id: "ObjectId(6502229c761cead53ce1099u)"
}

export const adminLogin =async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if(email !== adminCred.Email) {
            return res.status(400).json({message: "Admin does not exists!"})
        }

        if(password !== adminCred.Password) {
            return res.status(400).json({message: "Invalid Password"})
        }

        const token = generateToken(adminCred.Id);

        res.status(200).json({message: "Login successfull", token})
        
    } catch(error) {
        return res.status(500).json({message: "Admin login error"})
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find().exec();

        if(users) {
            console.log(users);            
            res.status(200).json({
                users
            })
        } else {
            return res.status(400).json({
                message: "Couldn't find the users"
            })
        }
    } catch(error) {
        console.error(error);
    }
}

export const blockUser = async(req: Request, res: Response) => {
    console.log('/////////////////////')
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
            {isBlocked : true} , {new : true}
        );

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Blocked ${updateUser.name}`});

    } catch (error: any) {
        console.log(error);
        
    }
}

export const unblockUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
            {isBlocked: false}, {new: true}
        )

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Unblocked ${updateUser.name}`});
    } catch (error) {
        console.log(error);
    }
}