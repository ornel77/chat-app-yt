import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, //fera référence à l'id du model User
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, //fera référence à l'id du model User
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true}) //createdAt, updatedAt => message.createdAt : 15:30

const Message = mongoose.model("Message", messageSchema)

export default Message
