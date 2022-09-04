import { IUser, userModel } from "./user.model";
import { CreateUserInput, User } from "./user.types";


interface IUserRepository {
    createUser(userInput: CreateUserInput): Promise<User>
}

export class UserRepository implements IUserRepository {


    async createUser(userInput: CreateUserInput): Promise<User>{
        const userToSave = new userModel(userInput)
        const savedUserFromDB = await userToSave.save()

        const appUser = this.convertDBuserToAppUser(savedUserFromDB)

        console.log(appUser)
        return appUser
    }


    private convertDBuserToAppUser(userFromDB: IUser): User{
        const user: User = {
            name: userFromDB.name,
            age: userFromDB.age, 
            email: userFromDB.email, 
            password: userFromDB.password, 
            id: userFromDB._id.toString(),
       } 
       return user
    }

}