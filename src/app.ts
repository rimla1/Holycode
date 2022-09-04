import {config} from 'dotenv'
config()

import mongoose from 'mongoose'
import express from "express"
import { userRouter } from "./module/User/user.routes"

const PORT = 3000
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ekxmb.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(express.json())

app.use("/api/v1/users", userRouter)

// await mongoose.connect(MONGODB_URI)
//    app.listen(PORT, () => {
//     console.log(`Server is up and running on port: ${PORT}`)
// })

mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to the DB")
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`)
    })
})

