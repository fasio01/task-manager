import mongoose  from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     desc:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","completed"],
        default:"pending"
    }
},{timestamps:true})

export default mongoose.model('task',taskSchema)