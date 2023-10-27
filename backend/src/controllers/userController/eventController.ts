import { Request, Response } from "express";
import userModel from "../../models/userModel";
import EventModel from "../../models/eventModel";
// import cloudinary from "../../utils/cloudinary";


const createUserEvent = async (req: Request, res: Response) => {
    try {
      console.log(req.body,'from create event');
      
      const id = req.params.id;
  
      const { eventName, location , startDate, endDate, attendeesLimit, image, description } = req.body;
      console.log(req.body);
  
      const user = await userModel.findById(id);
  
      if(!user){
          return res.status(404).json({message : 'Not found'});
      }

      // const result = await cloudinary.uploader.upload(image, {
      //   folder: "events",
      // })
  
      const event = await EventModel.create({
        organizedBy: user._id,
        eventName,
        location,
        startDate,
        endDate,
        attendeesLimit,
        image,
        description
      });
  
      if (event) {
        res.status(201).json({ message: 'Event created successfully' });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occured while creating event" });
    }
  };
  
  const getUserEvent = async (req: Request, res: Response) => {
    try {
      const event = await EventModel.find().exec()
  
      if(!event) {
        res.status(404).json({message: "Cannot find events"})
      }
      
      res.status(201).json({message: event})
    } catch (error) {
      console.error(error);  
    }
  }

  const joinUserEvent = async (req: Request, res: Response) => {
    try {
      const eventId = req.params.eventId;
      console.log(eventId);

      const user = req.user;
      console.log(user);

      if (!user) {
        return res.status(404).json({ error: "No user found" });
      }

      const event = await EventModel.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: "No event found" });
      }

      // Check if the user is already in the attendees array
      if (event.attendees.includes(user.id)) {
        return res.status(400).json({ error: "User is already attending this event" });
      }

      // Check if the event has reached its attendees limit
      if (event.attendees.length >= event.attendeesLimit) {
        return res.status(400).json({ error: "Event is full, cannot join" });
      }

      // If the user is not in the attendees array and the event is not full, push the user to the attendees array
      event.attendees.push(user?.id);
      await event.save();

      // saving event id on user model
      const userData = await userModel.findById(user.id)

      if (userData) {
        userData.eventsAttending.push(event._id);
        await userData.save();
    } else {
        console.error("User data not found");
    }

      return res.status(200).json({ message: "User joined the event successfully" });
    } catch (error) {
      console.error(error);
    }
  };


  const eventUsersAttending = async (req:Request,res:Response)=>{
    try {
      const {id}=req.params

      const user = await userModel.findById(id).populate('eventsAttending')

      if(!user) {
        return res.status(404).json({ error: "couldnt find the event with the user Id"})
      }
      
      res.status(201).json({user})
      
    } catch (error) {
      console.log(error);     
    }
  }

  export { createUserEvent, getUserEvent, joinUserEvent, eventUsersAttending, }