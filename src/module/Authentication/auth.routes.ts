import { Router } from "express";
import { UserRepository } from "../User/user.repository";
import { UserService } from "../User/user.service";
import { AuthController } from "./auth.controller";

export const authRouter = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const authController = new AuthController(userService)

authRouter.post("/login", authController.login.bind(authController));