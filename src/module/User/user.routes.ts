import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export const userRouter = Router()

// Create a User 
userRouter.post("/", userController.createUser.bind(userController))

// List a User
userRouter.get("/:userId")

// List a Users
userRouter.get("/")

// Update a User
userRouter.put("/:userId")

// Delete a User
userRouter.delete("/:userId")

// Search Users 
// userRouter.get("/:userName/:userAge", searchUsers)

