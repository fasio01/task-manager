import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import authroute from './routes/user.route.js'
import taskroute from './routes/task.route.js'
import connectDB from './config/db.js'
connectDB()
const app = express()
const port = process.env.PORT || 5000
//Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieparser())

app.use('/api/user',authroute)
app.use('/api/task',taskroute)
app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})