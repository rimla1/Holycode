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

/**
 * @openapi
 * /api/v1/logins/login:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Login as a user/admin
 */
authRouter.post("/login", authController.login.bind(authController));