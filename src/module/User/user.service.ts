import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"

interface IUserService {
    createUser(userInput: CreateUserInput): Promise<User>
    listUser(userId: string): Promise<User>
    listUsers(): Promise<User[]>
    updateUser(userId: string, editUserInput: EditUserInput): Promise<User>
    deleteUser(userId: string): Promise<User>
    // searchUsersByNameAndAge(userName: string, userAge: number): Promise<User[]>
}

export class UserService implements IUserService{

    private userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }

    async createUser(userInput: CreateUserInput): Promise<User>{
        try {
            const user = await this.userRepository.createUser(userInput)
            return user
        } catch (error) {
            throw error
        }
    }


    async listUser(userId: string): Promise<User>{
        try {
            const user = await this.userRepository.listUser(userId)
            return user
        } catch (error) {
            throw error
        }
    }

    async listUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.listUsers()
            return users
        } catch (error) {
            throw error
        }
    }

    async updateUser(userId: string, editUserInput: EditUserInput): Promise<User>{
        try {
            const user = await this.userRepository.updateUser(userId, editUserInput)
            return user
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId: string): Promise<User>{
        try {
            const deletedUser = await this.userRepository.deleteUser(userId)
            return deletedUser
        } catch (error) {
            throw error
        }
    }

    // async searchUsersByNameAndAge(userName: string, userAge: number): Promise<User[]>{
    //     try {
    //         const users = await this.userRepository.searchUsersByNameAndAge(userName, userAge)
    //         return users
    //     } catch (error) {
            
    //     }
    // }


}