import Message from "../models/message.model.js";
import User from "../models/user.model.js"

export const getusersforsidebar = async (req, res) => {
    try {
        const loggedinuserid = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedinuserid } }).select("-password")
        res.status(200).json(filteredUser)
    } catch(error) {
        console.log("Error in getuserforsidebar", error.message),
        res.status(500).json({message:'internal server error'})
    }
}

export const getmessages = async (req, res) => {
    try {
        const { id: userToChatid } = req.params
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChatId },
                {senderId:userToChatid,receivedId:myId}
            ]
        })

        res.status(200).json(messages)
    }
    catch (error) {
        console.log("error in getmessages controller", error.message)
        res.status(500).json({error :"Internal server error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receivedId } = req.params;
        const senderId = req.user._id;


        let imageurl;
        if (image) {
            const uploadresponse = await cloudinary.uploader.upload(image)
            imageurl = uploadResponse.secure_url;
        }

        const newmessage = new Message({
            senderId,
            receivedId,
            text,
            image:imageurl
        })

        await newmessage.save();

        res.status(201).json(newmessage)
    } catch (error) {
        console.log("error in sendmessage: ",error.message)
        res.status(500).json("internal server error",error.message)
    }
}