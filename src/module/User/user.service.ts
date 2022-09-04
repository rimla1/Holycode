import { UserRepository } from "./user.repository"
import { CreateUserInput, User } from "./user.types"

interface IUserService {
    createUser(userInput: CreateUserInput): Promise<User>
    listUser(userId: string): Promise<User>
    listUsers(): Promise<User[]>
}

export class UserService implements IUserService{

    private userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }

    async createUser(userInput: CreateUserInput): Promise<User>{
        const user = await this.userRepository.createUser(userInput)
        return user
    }


    async listUser(userId: string): Promise<User>{
        const user: User = {
            name: "Almir",
             age: 20, 
             email: "random@gmail.com", 
             password: "random", 
            id: userId,
        } 

        return user
    }

    async listUsers(): Promise<User[]> {
        const users: User[] = [
            {
            name: "Almir",
             age: 20, 
             email: "random@gmail.com", 
             password: "random", 
            id: "randomId",
            },
            {
                name: "Almir",
                 age: 20, 
                 email: "random@gmail.com", 
                 password: "random", 
                id: "randomId",
                }
        ]

        return users
    }


}