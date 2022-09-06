import { Router } from "express";
import { UserRepository } from "../User/user.repository";
import { UserService } from "../User/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const authRouter = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const authService = new AuthService(userService)
const authController = new AuthController(authService)

authRouter.post("/login", authController.login.bind(authController));