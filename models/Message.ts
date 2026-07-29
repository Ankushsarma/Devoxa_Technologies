import mongoose, { Schema, model, models } from "mongoose"

const MessageSchema = new Schema(
    {
        chatId: { type: String, required: true },
        text: { type: String, required: true },
        senderId: { type: String, required: true },
        senderName: { type: String, required: true },
        receiverId: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export default models.Message || model("Message", MessageSchema)
