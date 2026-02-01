import Task from '../models/task.model.js'

export const createtask = async(req,res) => {
    try {
        await Task.create({...req.body,userId:req.user.userId})
        res.status(200).json({
            message:"task created successfully"
        })
    } catch (error) {
          res.status(500).json({
            message:error.message
        })
    }
}
export const gettasks = async(req,res) => {
    try {
        const data = await Task.find({userId:req.user.userId})
        res.status(200).json(data)
    } catch (error) {
           res.status(500).json({
            message:error.message
        })
    }
}

export const updatetask = async(req,res) => {
    try {
        Task.findOneAndUpdate({_id:req.params.id,userId:req.user.userId},req.body,{new:true})
          res.status(200).json({
            message:"task updated successfully"
        })
    } catch (error) {
             res.status(500).json({
            message:error.message
        })
    }
}

export const deletetask = async(req,res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId })
          res.status(200).json({
            message:"task deleted successfully"
        })
    } catch (error) {
             res.status(500).json({
            message:error.message
        })
    }
}