import { Router } from "express";
import { createUser, listUser, listUsers, updateUser, deleteUser } from "./user.controller";

export const userRouter = Router()

// Create a User 
userRouter.post("/", createUser)

// List a User
userRouter.get("/:userId", listUser)

// List a Users
userRouter.get("/", listUsers)

// Update a User
userRouter.put("/:userId", updateUser)

// Delete a User
userRouter.delete("/:userId", deleteUser)

// Search Users 
// userRouter.get("/:userName/:userAge", searchUsers)

