import mongoose from 'mongoose'

const schema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    latestMessage: {
        type: String,
        default: "New Chat"
    },
}, 
{
    timestamps: true
}
);

// export const chat = mongoose.model("chat", schema)
const Chat = mongoose.model("Chat", schema);
export default Chat;