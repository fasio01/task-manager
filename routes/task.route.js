import express from 'express'
const route = express.Router()
import {createtask,gettasks,updatetask,deletetask} from '../controllers/task.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
route.post('/',isAuthenticated,createtask)
route.get('/',isAuthenticated,gettasks)
route.put('/:id',isAuthenticated,updatetask)
route.delete('/:id',isAuthenticated,deletetask)
export default route