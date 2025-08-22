import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
  senderId:{
    type:String,
    ref:"Portfolio",
    required:true,
  },
   recieverId:{
        type:String,
        ref:"Portfolio",
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
},
{
   timestamps:true,
}
)
const Message=mongoose.model("Message",messageSchema);
export default Message;