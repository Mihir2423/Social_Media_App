import Chat from "../models/chatModel.js";

export const chatChat = async (req, res) => {
  const { senderId, recieverId } = req.body;
  if(!senderId || recieverId) return res.status(404).send("Send the body properly")
  const newchat = new Chat({
    members: [senderId, recieverId],
  });
  try {
    const result = await newchat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const userChats = async (req, res) => {
  const { userId } = req.params;
  try {
    const chat = await Chat.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export const findChat = async (req, res) => {
    const {firstId, secondId} = req.params
    try {
        const chat = await Chat.findOne({
            members : {$all : [firstId, secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." }); 
    }
};
