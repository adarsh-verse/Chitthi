import mongoose from "mongoose";
import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId.toString();
    const receiver = req.params.receiver.toString();
    let { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }


    let chatArray = [sender, receiver].sort();
    let chatId = chatArray.join("_");


    let conversation = await Conversation.findOne({ chatId });


    if (!conversation) {
      conversation = await Conversation.create({
        chatId,
        messages: {
          sender: sender,
          message: message.toString(),
          image: image
        },
      });
    } else {
    
  
        conversation.messages.push({
          sender: sender,
          message: message.toString(),
          image: image
        });
      await conversation.save();
    }

    return res.status(201).json(conversation.messages);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `send message error: ${err.message}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const sender = req.userId.toString();
    const receiver = req.params.receiver.toString();


    let chatArray = [sender, receiver].sort();
    let chatId = chatArray.join("_");

    const conversation = await Conversation.findOne({ chatId });

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = [
      conversation.messages,
    ];

    return res.status(200).json(messages);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `get message error: ${err.message}` });
  }
};
