import cloudinary from "../lib/cloudinary.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const sideBarUsers = async(req, res) => {
    try {
        const loginUserId = req.user._id;
        if(!loginUserId) return res.status(400).json({message : 'user not authenticated'});

        const filteredUSers = await User.find({_id : {$ne : loginUserId}}).select('-password');

        res.status(201).json(filteredUSers);

    } catch (error) {
        res.status(500).json({message : 'internal server error'});
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id : userToChatId} = req.params;

        const myId = req.user._id;
        if(!myId) return res.status(400).json({message : 'user not authenticated'});

        const messages = await Message.find({
            $or : [
                {senderId : myId, receiverId : userToChatId},
                {senderId : userToChatId, receiverId : myId},
            ],
        });

        res.status(201).json(messages);
    } catch (error) {
        res.status(500).json({message : 'internal server error'});
    }
}

export const sendMEssage = async(req, res) => {
    try {
        const {text, image} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image);
             imageUrl = uploadImage.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl
        })
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({message : 'internal server error'});
    }
}