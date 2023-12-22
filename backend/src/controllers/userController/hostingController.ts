import { Request, Response } from "express";
import HostingModel from "../../models/hostingModel";
import userModel from "../../models/userModel";
import HostingAndTravelingModel from "../../models/hostingAndTravelingModel";

const createHostingFacility = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "UserId not found!" });
    }

    const {
      availableNights,
      noOfGuests,
      preferredGender,
      kidFriendly,
      petFriendly,
      smoking,
      sleepingArrangement,
      sleepingArrangementDescription,
      transportationAccess,
      whatCanIShare,
      additionalInformation,
    } = req.body;

    const hosting = await HostingModel.findOneAndUpdate(
      { userId: userId },
      {
        noOfGuests: noOfGuests,
        preferredGender: preferredGender,
        kidFriendly: kidFriendly,
        petFriendly: petFriendly,
        smoking: smoking,
        sleepingArrangement: sleepingArrangement,
        sleepingArrangementDescription: sleepingArrangementDescription,
        transportationAccess: transportationAccess,
        whatCanIShare: whatCanIShare,
        additionalInformation: additionalInformation,
      }
    );

    if (hosting) {
      return res.status(201).json({ message: "Saved your preferences" });
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
        additionalInformation: additionalInformation,
      });
      if (createHosting) {
        const userData = await userModel.findById(userId);
        if (userData) {
          userData.hostingId = createHosting._id;
          await userData.save();
        } else {
          console.error("User data not found");
          return res.status(404).json({ message: "User data not found" });
        }

        return res.status(201).json({ message: "Saved your preferences" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getHostingFacility = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ message: "UserId not found!" });
    }

    const hosting = await HostingModel.findOne({ userId: userId });

    console.log(hosting);

    if (hosting) {
      return res.status(201).json({ hosting });
    } else {
      return res.status(404).json({ message: "Coudnt find data! " });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const hostAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { targettedUserId } = req.params;

    const { arrivalDate, departureDate, noOfTravelers, message } = req.body;

    const host = await HostingAndTravelingModel.create({
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      noOfTravelers: noOfTravelers,
      messages: [{ userId: userId, message: message, createdAt: new Date() }],
      hostingUser: userId,
      requestingUser: targettedUserId,
      response: "Accepted",
      latestMessage: {
        userId: userId,
        message: message,
        createdAt: new Date(),
      },
    });

    if (host) {
      return res.status(201).json({ message: "Saved successfully", host });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const requestForHosting = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { targettedUserId } = req.params;

    const { arrivalDate, departureDate, noOfTravelers, message } = req.body;

    const host = await HostingAndTravelingModel.create({
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      noOfTravelers: noOfTravelers,
      messages: [{ userId: userId, message: message, createdAt: new Date() }],
      hostingUser: targettedUserId,
      requestingUser: userId,
      latestMessage: {
        userId: userId,
        message: message,
        createdAt: new Date(),
      },
    });

    if (host) {
      return res.status(201).json({ message: "Saved successfully", host });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendSimpleMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { chatId } = req.params;

    const { message } = req.body;

    const chat = await HostingAndTravelingModel.findOneAndUpdate(
      { _id: chatId },
      {
        $push: {
          messages: {
            userId: userId,
            message: message,
          },
        },
        latestMessage: {
          userId: userId,
          message: message,
          createdAt: new Date(),
        },
      }
    );

    if (!chat) {
      console.log(chat);
      return res.status(400).json({ message: "Message not sent" });
    }

    return res
      .status(201)
      .json({ message: "Message sent successfully", chat: chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findExistingHostingChat = async (req: Request, res: Response) => {
  try {
    const loggedinUser = req.user?.id;

    const { id } = req.params;

    const chat = await HostingAndTravelingModel.findOne({
      $or: [
        { hostingUser: loggedinUser, requestingUser: id },
        { requestingUser: loggedinUser, hostingUser: id },
      ],
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createHostingFacility,
  getHostingFacility,
  hostAUser,
  requestForHosting,
  sendSimpleMessage,
  findExistingHostingChat,
};
