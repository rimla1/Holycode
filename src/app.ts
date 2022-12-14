import { config } from 'dotenv'
config()

import mongoose from 'mongoose'
import express, { Request, Response, NextFunction } from "express"
import { userRouter } from "./module/User/user.routes"
import { authRouter } from './module/Authentication/auth.routes'
import { AlreadyExistsError, DoesNotExistsError, NotAuthenticated, NotFoundError, ValidationError } from './shared/errors'
import swaggerDocs from './utils/swagger'


const PORT = 3000
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ekxmb.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(express.json())


app.use("/api/v1/users", userRouter)
app.use("/api/v1/logins", authRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AlreadyExistsError || err instanceof ValidationError || err instanceof DoesNotExistsError || err instanceof NotFoundError || err instanceof NotAuthenticated) {
        return res.status(err.statusCode).json({ errors: err.errors })
    }
    console.log(err)
    return res.status(500).json({ message: "Something went wrong" });
})


mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to the DB")
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`)
        swaggerDocs(app, PORT)
    })
})

