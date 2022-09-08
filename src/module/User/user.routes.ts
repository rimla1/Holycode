import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import isAuth from "../../shared/is-auth"
import { hasType } from "../../shared/has-roles"; 

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export const userRouter = Router()

// Create a User 
userRouter.post("/", isAuth, hasType(["admin"]), userController.createUser.bind(userController))

// Get user by name
userRouter.get("/search", userController.searchUsersByNameAndOrAge.bind(userController))

// List a User
userRouter.get("/:userId", isAuth, hasType([]), userController.listUser.bind(userController))

// List a Users
userRouter.get("/", isAuth, hasType([]), userController.listUsers.bind(userController))

// Update a User
userRouter.put("/:userId", isAuth,  userController.updateUser.bind(userController))

// Delete a User
userRouter.delete("/:userId", isAuth, userController.deleteUser.bind(userController))


// Get user by 

// Search Users 
// userRouter.get("/:userName/:userAge", searchUsers)

