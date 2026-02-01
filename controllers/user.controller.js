import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Auth from '../models/user.model.js'
export const register = async(req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user = await Auth.findOne({email})
        if(user) return res.status(400).json({
            message:"user already exist"
        })
        const hashpassword = await bcrypt.hash(password,10)
        await Auth.create({
name,
email,
password:hashpassword
        })
        res.status(200).json({
            message:"user registered successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


export const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await Auth.findOne({email})
        if(!user) return res.status(400).json({
            message:"user does not exist"
        })
        
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched) return res.status(400).json({
            message:"password is not matched"
        })
        const token = jwt.sign({userId:user._id},process.env.JWTKEY,{expiresIn:"1h"})
      res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: 3600000, 
    sameSite: 'None',
    path: '/',
});
res.status(200).json({
  message: "login successful",
  token,
  user:{
    userId:user._id,
    name:user.name,
    email:user.email
  }
})

    } catch (error) {
          res.status(500).json({
            message:error.message
        })
    }
}

export const logout = (req,res) => {
try {
    res.clearCookie("token",{
          httpOnly: true,
  secure: true,
  sameSite: 'None',
  path: '/',
    })
    res.status(200).json({
        message:"logout successfully"
    })
} catch (error) {
       res.status(500).json({
            message:error.message
        })
}
}