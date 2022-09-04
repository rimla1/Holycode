import { Router } from "express";
import { createUser, listUser, listUsers } from "./user.controller";

export const userRouter = Router()

// Create a User 
userRouter.post("/", createUser)

// List a User
userRouter.get("/:userId", listUser)

// List a Users
userRouter.get("/", listUsers)


