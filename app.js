require("dotenv").config()
const express=require('express')
const app=express()
const PORT=3500
const transactionRouter=require('./routes/transactionRoutes')

const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log(`Connected successfully to database`))


app.use(cors())
app.use(express.json())

app.use('/api/v1/financeTracker',transactionRouter)

app.listen(PORT,console.log(`Server started running at http://localhost:${PORT}/api/v1/financetracker/ `))