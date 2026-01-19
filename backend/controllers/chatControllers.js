import Chat from "../models/chat.js";
import Conversation from "../models/Conversation.js";
import mongoose from "mongoose";

// Create new Chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const newChat = await Chat.create({
      user: userId,
    });

    res.json(newChat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all chats for logged-in user
export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1, // fixed typo
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add new conversation to a chat
export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat)
      return res.status(404).json({
        message: "No chat found with this id!",
      });

    const newConversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation: newConversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all conversations for a chat
export const getConversation = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid chat ID" });
    }

    // check if chat exists
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const conversations = await Conversation.find({ chat: id }).sort({ createdAt: 1 });

    // Return empty array if no conversations yet
    return res.json(conversations || []);
  } catch (error) {
    console.error("getConversation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete chat
export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat)
      return res.status(404).json({
        message: "No chat found with this id!",
      });

    if (chat.user.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
