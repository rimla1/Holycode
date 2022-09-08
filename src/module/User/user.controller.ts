import {Request, Response, NextFunction} from "express"
import { UnexpectedError, ValidationError } from "../../shared/errors"
import { UserService } from "./user.service"
import { CreateUserInput, EditUserInput } from "./user.types"
import { createUserInputValidation, updateUserInputValidation } from "./user.validation"



export class UserController {

    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    async createUser(req: Request, res: Response, next: NextFunction){
        const {name, age, email, password, types} = req.body

        const userInput: CreateUserInput = {
            name,
            age,
            email,
            password,
            types
        }
        try {
            const createUserInput = createUserInputValidation.validate(userInput, {abortEarly: false})
            if(createUserInput.error){
                throw new ValidationError(createUserInput.error.details)
            }
            const createdUser = await this.userService.createUser(userInput)
            return res.json(createdUser)
        } catch (error) {
            return next(error)
        }
    }


    async listUser(req: Request, res: Response, next: NextFunction){
        const {userId} = req.params
        try {
            const user = await this.userService.listUser(userId)
            return res.json(user)
        } catch (error) {
            return next(error)
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction){
        try {
            const users = await this.userService.listUsers()
            return res.json(users)
        } catch (error) {
            return next(error)
        }
    }

    async updateUser (req: Request, res: Response, next: NextFunction){
            const {name, age, password} = req.body
            const {userId} = req.params
            const editUserInput: EditUserInput = {
                name,
                age,
                password,
            }
            try {
            const updateUserInput = updateUserInputValidation .validate(editUserInput, {abortEarly: false})
            if(updateUserInput.error){
                throw new ValidationError(updateUserInput.error.details)
            }
            const editedUser = await this.userService.updateUser(userId, editUserInput)
            return res.json(editedUser)
            } catch (error) {
                return next(error)
            }
        }


        async deleteUser (req: Request, res: Response, next: NextFunction){
            const {userId} = req.params
            try {
            const deletedUser = await this.userService.deleteUser(userId)
            return res.json(deletedUser)
            } catch (error) {
                return next(error)
            }
        }

        async searchUsersByNameAndOrAge(req: Request, res: Response, next: NextFunction){
            const {name, age} = req.query
            try {
            if (typeof name == "string" || typeof age == "string") {
                if(name && age){
                    const users = await this.userService.searchUsersByNameAndAge(name as string, +age)
                    return res.json(users)
                }
                if(name){
                    const users = await this.userService.searchUsersByName(name as string)
                    return res.json(users)
                }
                if(age){
                    const users = await this.userService.searchUsersByAge(+age)
                    return res.json(users)
                }
              }
                throw new UnexpectedError("Query param 'url' has to be of type string")
            } catch (error) {
                return next(error)
            }
        }

}












// export const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     const {name, age, email, password} = req.body

//     const userInput: CreateUserInput = {
//         name,
//         age,
//         email,
//         password
//     }
//     try {    
//         const createdUser = await userService.createUser(userInput)
//         return res.json(createdUser)
//     } catch (error) {
//         throw new Error("later error handling")
//     }
// }

// export const listUser =  async (req: Request, res: Response, next: NextFunction) => {
//     const {userId} = req.params
//     try {
//         const user = await userService.listUser(userId)
//         return res.json(user)
//     } catch (error) {
//         throw new Error("later error handling")
//     }
// }

// export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await userService.listUsers()
//         return res.json(users)
//     } catch (error) {
//         throw new Error("later error handling")
//     }
// }

// export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
//     const {name, age, password} = req.body
//     const {userId} = req.params
//     const editUserInput: EditUserInput = {
//         name,
//         age,
//         password,
//     }
//     try {
//     const editedUser = await userService.updateUser(userId, editUserInput)
//     return res.json(editedUser)
//     } catch (error) {
//         throw new Error("later error handling")
//     }
// }

// export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//     const {userId} = req.params
//     try {
//     const deletedUser = await userService.deleteUser(userId)
//     return res.json(deletedUser)
//     } catch (error) {
//         throw new Error("later error handling")
//     }
// }

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