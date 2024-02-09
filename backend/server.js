// PAckage import
import express from 'express'
import dotenv from 'dotenv'


// File import
import authRoutes from './routes/auth.routes.js'
import connectToMongoDb from './db/connectToMongoDB.js'


// Variables
const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()

// Middleware
app.use(express.json()) // to parse the incoming request with JSON payloads (from req.body)
app.use('/api/auth', authRoutes)



// Test route
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })




app.listen(PORT, () => {
    connectToMongoDb()
    console.log("Server running on port " + PORT)
})