import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"
import bcrypt from "bcryptjs"

interface IUserService {
    createUser(userInput: CreateUserInput): Promise<User>
    listUser(userId: string): Promise<User>
    listUsers(): Promise<User[]>
    updateUser(userId: string, editUserInput: EditUserInput): Promise<User>
    deleteUser(userId: string): Promise<User>
    searchUsersByNameAndAge(name: string, age: number): Promise<User[]>
    searchUsersByName(name: string): Promise<User[]>
    searchUsersByAge(age: number): Promise<User[]>
    getUserByEmail(email: string): Promise<User>
}

export class UserService implements IUserService {

    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async createUser(userInput: CreateUserInput): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(userInput.password, 10)
            const user = await this.userRepository.createUser({ ...userInput, password: hashedPassword })
            return user
        } catch (error) {
            throw error
        }
    }


    async listUser(userId: string): Promise<User> {
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

    async updateUser(userId: string, editUserInput: EditUserInput): Promise<User> {
        try {
            const user = await this.userRepository.updateUser(userId, editUserInput)
            return user
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId: string): Promise<User> {
        try {
            const deletedUser = await this.userRepository.deleteUser(userId)
            return deletedUser
        } catch (error) {
            throw error
        }
    }

    async searchUsersByNameAndAge(name: string, age: number): Promise<User[]> {
        try {
            const users = await this.userRepository.searchUsersByNameAndAge(name, age)
            return users
        } catch (error) {
            throw error
        }
    }

    async searchUsersByName(name: string): Promise<User[]> {
        try {
            const users = await this.userRepository.searchUsersByName(name)
            return users
        } catch (error) {
            throw error
        }
    }

    async searchUsersByAge(age: number): Promise<User[]> {
        try {
            console.log(age)
            const users = await this.userRepository.searchUsersByAge(age)
            return users
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.getUserByEmail(email)
            return user
        } catch (error) {
            throw error
        }
    }
}