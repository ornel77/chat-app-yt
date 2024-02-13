// PAckage import
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'

dotenv.config()

// File import
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

// DB 
import connectToMongoDb from './db/connectToMongoDB.js'


// Variables
const PORT = process.env.PORT || 5000

// TO DEPLOY
const __dirname = path.resolve()


// Middleware
app.use(express.json()) // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()) // to access the cookies
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// give the absolute path to the root folder to deploy
// run our frontend to the server
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', "dist", "index.html"))
})



server.listen(PORT, () => {
    connectToMongoDb()
    console.log("Server running on port " + PORT)
})