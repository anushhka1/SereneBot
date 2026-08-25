// // AIzaSyAmQXnUx0MQagAlsuH1rxGBHQvQRdjP_l8

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [createLoad, setCreateLoad] = useState(false);
  const [load, setLoad] = useState(false);

  // Helper to load messages from localStorage
  const loadMessagesFromStorage = (chatId) => {
    const stored = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    return stored[chatId] || [];
  };

  // Helper to save messages to localStorage
  const saveMessagesToStorage = (chatId, msgs) => {
    const stored = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    stored[chatId] = msgs;
    localStorage.setItem("chatMessages", JSON.stringify(stored));
  };

  const fetchResponse = async () => {
    if (!prompt.trim()) return alert("Write prompt");
    if (!selectedChat) return alert("Select a chat first");

    setNewRequestLoading(true);
    const token = localStorage.getItem("token");

    try {
      //System instruction: trains the model each time
      const systemPrompt = `
You are SereneBot — an empathetic and supportive mental health companion.
Your main goal is to help users process feelings, reduce stress, and feel understood.
Always respond with warmth, compassion, and kindness.
Never provide medical or diagnostic advice.
Encourage self-awareness, calmness, and a positive mindset.
If the user shares sadness or emotional distress, respond gently with empathy and support.
If the user asks about topics outside of emotional well-being, you may answer briefly in a polite, friendly manner, answer based on that field 
then gently guide the conversation back to self-growth, mental health, or well-being in one line. If they ask the menatl health related things then answer in step by step manner be a problem solver for them
Keep your responses concise, clear, and emotionally understanding, while maintaining a comforting tone. whatever is asked answer it in almost 500-800 words but If the user asks a short factual question (definition, yes/no, term explanation), respond concisely in 1-3 paragrhaphs or points.
`;

      const combinedPrompt = `${systemPrompt}\n\nUser: ${prompt}\nSereneBot:`;

      const response = await axios.post(
        // "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=AIzaSyAmQXnUx0MQagAlsuH1rxGBHQvQRdjP_l8",
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=AIzaSyBo1AJN1N4tW3rZ58U4PsFkwhq1Ujo3nw0",
        {
          contents: [{ parts: [{ text: combinedPrompt }] }],
        },
        { headers: { "Content-Type": "application/json" } },
      );

      const answerText = response.data.candidates[0].content.parts[0].text;

      const newMessage = { question: prompt, answer: answerText };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      saveMessagesToStorage(selectedChat, updatedMessages);
      setPrompt("");

      // Update latestMessage for Sidebar
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === selectedChat ? { ...chat, latestMessage: prompt } : chat,
        ),
      );

      // Save chat message to backend
      await axios.post(
        `${server}/api/chat/${selectedChat}`,
        { question: prompt, answer: answerText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setNewRequestLoading(false);
    }
  };

  // Fetch all chats and load selected chat
  const fetchChatData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Load stored messages for latestMessage
      const storedMessages = JSON.parse(
        localStorage.getItem("chatMessages") || "{}",
      );

      const updatedChats = data.map((chat) => ({
        ...chat,
        latestMessage:
          storedMessages[chat._id] && storedMessages[chat._id].length > 0
            ? storedMessages[chat._id][storedMessages[chat._id].length - 1]
                .question
            : chat.messages && chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1].question
              : "",
      }));

      setChats(updatedChats);

      // Load selected chat from localStorage
      const storedSelectedChat = localStorage.getItem("selectedChat");
      if (
        storedSelectedChat &&
        updatedChats.find((c) => c._id === storedSelectedChat)
      ) {
        setSelectedChat(storedSelectedChat);
        setMessages(loadMessagesFromStorage(storedSelectedChat));
      } else if (updatedChats.length > 0) {
        setSelectedChat(updatedChats[0]._id);
        setMessages(loadMessagesFromStorage(updatedChats[0]._id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load chats.");
    }
  };

  // Create a new chat
  const createChat = async () => {
    setCreateLoad(true);
    const token = localStorage.getItem("token");
    try {
      const { data: newChat } = await axios.post(
        `${server}/api/chat/new`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setChats((prev) => [{ ...newChat, latestMessage: "" }, ...prev]);
      setSelectedChat(newChat._id);
      setMessages([]);
      localStorage.setItem("selectedChat", newChat._id);
      toast.success("New chat created!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create chat!");
    } finally {
      setCreateLoad(false);
    }
  };

  // Fetch messages for selected chat
  // const fetchMessages = () => {
  //   if (!selectedChat) return;
  //   setMessages(loadMessagesFromStorage(selectedChat));
  // };

  // Fetch messages for selected chat
  const fetchMessages = async () => {
    if (!selectedChat) return;
    const token = localStorage.getItem("token");

    // 1️⃣ Load from localStorage instantly (faster UI)
    const localMsgs = loadMessagesFromStorage(selectedChat);
    setMessages(localMsgs);

    try {
      // 2️⃣ Fetch fresh messages from backend
      const { data } = await axios.get(`${server}/api/chat/${selectedChat}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 3️⃣ Update both UI and localStorage
      setMessages(data);
      saveMessagesToStorage(selectedChat, data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch messages from server");
    }
  };

  // Delete chat
  const deleteChat = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);

      // Remove messages from localStorage
      const stored = JSON.parse(localStorage.getItem("chatMessages") || "{}");
      delete stored[id];
      localStorage.setItem("chatMessages", JSON.stringify(stored));

      fetchChatData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete chat!");
    }
  };

  // Update selected chat in localStorage whenever it changes
  useEffect(() => {
    if (selectedChat) localStorage.setItem("selectedChat", selectedChat);
    fetchMessages();
  }, [selectedChat]);

  // Load chats on mount
  useEffect(() => {
    fetchChatData();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        prompt,
        setPrompt,
        newRequestLoading,
        fetchResponse,
        chats,
        createChat,
        createLoad,
        selectedChat,
        setSelectedChat,
        load,
        setLoad,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
