const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', taskRoutes)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log('Server running on port 5000')),
  )
  .catch(err => console.log(err))
