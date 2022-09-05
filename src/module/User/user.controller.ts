import {Request, Response, NextFunction} from "express"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { CreateUserInput, EditUserInput } from "./user.types"

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
    try {    
        const createdUser = await userService.createUser(userInput)
        return res.json(createdUser)
    } catch (error) {
        throw new Error("later error handling")
    }
}

export const listUser =  async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params
    try {
        const user = await userService.listUser(userId)
        return res.json(user)
    } catch (error) {
        throw new Error("later error handling")
    }
}

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.listUsers()
        return res.json(users)
    } catch (error) {
        throw new Error("later error handling")
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, age, password} = req.body
    const {userId} = req.params
    const editUserInput: EditUserInput = {
        name,
        age,
        password,
    }
    try {
    const editedUser = await userService.updateUser(userId, editUserInput)
    return res.json(editedUser)
    } catch (error) {
        throw new Error("later error handling")
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params
    try {
    const deletedUser = await userService.deleteUser(userId)
    return res.json(deletedUser)
    } catch (error) {
        throw new Error("later error handling")
    }
}

// export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const {userName, userAge} = req.params
//     try {
//         if(userName && userAge){
//             const searchUsersByNameAndAge = await userService.searchUsersByNameAndAge(userName, userAge)
//         } 
//         if(userName){
//             const searchUsersByName = await userService.searchUsersByName(userName)
//         }
//         if(userAge){
//             const searchUsersByAge = await userService.searchUsersByAge(userAge)
//         }
//     } catch (error) {
//         throw new Error("later error handling")
//     }

    
// }