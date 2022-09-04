import {Request, Response, NextFunction} from "express"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { CreateUserInput } from "./user.types"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const {name, age, email, password} = req.body

    const userInput: CreateUserInput = {
        name,
        age,
        email,
        password
    }

    const createdUser = await userService.createUser(userInput)
    return res.json(createdUser)
}

export const listUser =  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    console.log(userId)

    const user = await userService.listUser(userId)
    return res.json(user)
}

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.listUsers()
    return res.json(users)
}