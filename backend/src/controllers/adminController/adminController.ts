import { Request, Response } from "express"
import userModel from "../../models/userModel";
import  jwt  from "jsonwebtoken";
import GroupModel from "../../models/groupModel";
import EventModel from "../../models/eventModel";
import HostingModel from "../../models/hostingModel";
import VerifiedModel from "../../models/verifiedUserModel";

const cred = JSON.parse(process.env.ADMIN_CRED as any);

const adminCred = {
    Email: cred.EMAIL,
    username: cred.USERNAME,
    Password: cred.PASSWORD,
    Id: cred.ID
}

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const {usernameOrEmail, password} = req.body;

        if(usernameOrEmail === adminCred.username || usernameOrEmail === adminCred.Email) {
            if(password !== adminCred.Password) {
                return res.status(400).json({message: "Invalid Password"})
            }
    
            const user_id = adminCred.Id
                    
            const token = jwt.sign({ user_id }, process.env.JWT_SECRET as string, {
                expiresIn: '30d',
            })
            
            res.status(200).json({message: "Login successfull", adminCred, token})         
        } else {
            return res.status(400).json({message: "Admin does not exists!"})
        }
        
    } catch(error) {
        console.log(error)
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
        res.status(500).json({message: "Internal server error"})   
    }
}

export const blockUser = async(req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
            {isBlocked : true} , {new : true}
        );

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Blocked ${updateUser.name}`, user: updateUser});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})   
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
        res.status(500).json({message: "Internal server error"})   
    }
}

export const adminDashboard = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        // const currentMonth = currentDate.getMonth() + 1;

        const totalUsers = await userModel.countDocuments();
        const totalVerifiedUsers = await VerifiedModel.countDocuments();
        const totalGroups = await GroupModel.countDocuments();
        const eventsGoingOn = await EventModel.countDocuments({
            endDate: { $gte: currentDate },
          });

        const userMonthlyCounts = new Array(12).fill(0);
        const verifiedMonthlyCounts = new Array(12).fill(0);
        
        const users = await userModel.find();
        const verifiedUsers = await VerifiedModel.find();
        

        users.forEach((user) => {
            const userJoinedDate = new Date(user.createdAt);
            const userJoinedMonth = userJoinedDate.getMonth();
            const userJoinedYear = userJoinedDate.getFullYear();
            
            if(userJoinedYear === currentYear) {
                userMonthlyCounts[userJoinedMonth]++;
            }
        })

        verifiedUsers.forEach((user) => {
            const verifiedDate = new Date(user.createdAt);
            const verifiedMonth = verifiedDate.getMonth();
            const verifiedYear = verifiedDate.getFullYear();

            if(verifiedYear === currentYear) {
                verifiedMonthlyCounts[verifiedMonth]++;
            }
        })
        console.log(userMonthlyCounts, "ddddddddddddddddd")
        return res.status(201).json({totalUsers, userMonthlyCounts, totalVerifiedUsers, verifiedMonthlyCounts, totalGroups, eventsGoingOn})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})       
    }
}

export const findUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find()
        if(users) {
            return res.status(201).json({messsage: 'success', users})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})       
    }
}

export const getGroups = async (req: Request, res: Response) => {
    try {
        const groups = await GroupModel.find();
        if(groups) {
            return res.status(201).json({message: "success", groups})
        } else {
            return res.status(404).json({message: "Coudn't get groups"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})       
    }
}

export const getEvents = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();
        const events = await EventModel.find({ endDate: { $gte: currentDate }});
        if(events) {
            return res.status(201).json({message: "success", events})
        } else {
            return res.status(404).json({message: "Coudn't get events"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})       
    }
}

export const getHosts = async (req: Request, res: Response) => {
    try {
        const hosts = await HostingModel.find().populate("userId");
        if(hosts) {
            return res.status(201).json({message: "success", hosts})
        } else {
            return res.status(404).json({message: "Coudn't get hosts"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})       
    }
}

export const blockGroup = async(req: Request, res: Response) => {
    console.log('/////////////////////')
    try {
        const groupId = req.params.id;

        const updateGroup = await GroupModel.findByIdAndUpdate(groupId, 
            {isBlocked : true} , {new : true}
        );

        if(!updateGroup){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Blocked ${updateGroup.name}`});

    } catch (error: any) {
        console.log(error);
        
    }
}

export const unblockGroup = async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id;

        const updateGroup = await GroupModel.findByIdAndUpdate(groupId, 
            {isBlocked: false}, {new: true}
        )

        if(!updateGroup){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Unblocked ${updateGroup.name}`});
    } catch (error) {
        console.log(error);
    }
}