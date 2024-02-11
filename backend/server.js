// PAckage import
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

// File import
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

// DB 
import connectToMongoDb from './db/connectToMongoDB.js'


// Variables
const app = express()
const PORT = process.env.PORT || 5000


// Middleware
app.use(express.json()) // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()) // to access the cookies
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)



// Test route
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })




app.listen(PORT, () => {
    connectToMongoDb()
    console.log("Server running on port " + PORT)
})