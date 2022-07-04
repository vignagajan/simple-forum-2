const express = require('express')
const connectDb = require('./config/db')
const cors = require('cors')
const { getTopics, setTopic } = require('./controller/topicController')
const errorHandler = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const port = process.env.port || 5000

connectDb()

const app = express()

app.use(cors())
    
// Handle post requests
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// Routes
app.use('/api/topic', require('./routes/topicRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

// Custom error handler
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server has started on port ${port}`))
