import express from 'express'
const route = express.Router()
import {register,login,logout} from '../controllers/user.controller.js'

route.post('/register',register)
route.post('/login',login)
route.get('/logout',logout)
export default route