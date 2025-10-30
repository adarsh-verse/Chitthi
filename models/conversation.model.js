import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    }   

},{timestamps:true})

const conversationSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
    },
    messages: {
        type:[messageSchema],
        default:[]
    }
}, { timestamps: true })

const Conversation = mongoose.model("conversation", conversationSchema)
export default Conversation