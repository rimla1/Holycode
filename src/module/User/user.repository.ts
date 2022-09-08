import { AlreadyExistsError, NotFoundError } from "../../shared/errors";
import { IUser, userModel } from "./user.model";
import { CreateUserInput, EditUserInput, User } from "./user.types";


interface IUserRepository {
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

export class UserRepository implements IUserRepository {


    async createUser(userInput: CreateUserInput): Promise<User>{
        try {
            const existingUser = await userModel.findOne({email: userInput.email}) 
            if(existingUser){
                throw new AlreadyExistsError(`User with email ${userInput.email} alreay exists`)
            }
            const userToSave = new userModel(userInput)
            const userFromDB = await userToSave.save()
            const appUser = this.convertDBuserToAppUser(userFromDB)
            return appUser
        } catch (error) {
            throw error
        }
    }

    async listUser(userId: string): Promise<User>{
        try {
            const userFromDB = await userModel.findById(userId)
            if(!userFromDB){
                throw new NotFoundError(`User with this id: ${userId} is not found`)
            }
            const appUser = this.convertDBuserToAppUser(userFromDB)
            return appUser
        } catch (error) {
            throw error
        }
    }

    async listUsers(): Promise<User[]> {
        try {
            const usersFromDB = await userModel.find()
            let appUsers: User[] = []
            usersFromDB.forEach(user => {
                const appUser = this.convertDBuserToAppUser(user) 
                appUsers.push(appUser)
            });
    
            return appUsers
        } catch (error) {
            throw error
        }
    }

    async updateUser(userId: string, editUserInput: EditUserInput): Promise<User>{
        try {
            const editedUserFromDB = await userModel.findByIdAndUpdate({_id: userId}, {...editUserInput}, {new: true})
            if(!editedUserFromDB){
                throw new NotFoundError(`User with this Id: ${userId} is not found or it's not updated, try again!`)
            }
            const appEditedUser = this.convertDBuserToAppUser(editedUserFromDB)
            return appEditedUser
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId: string): Promise<User>{
        try {
            const deletedUserFromDB = await userModel.findByIdAndDelete(userId)
            if(!deletedUserFromDB){
                throw new NotFoundError(`User with this id: ${userId} is not found`)
            }
            const appDeletedUser = this.convertDBuserToAppUser(deletedUserFromDB)
            return appDeletedUser
        } catch (error) {
            throw error
        }
    }

    async searchUsersByNameAndAge(name: string, age: number): Promise<User[]>{
        try {
            const usersFromDB = await userModel.find({name: name, age: age})

            let appUsers: User[] = []
            usersFromDB.forEach(user => {
                const appUser = this.convertDBuserToAppUser(user)
                appUsers.push(appUser)
            });

            return appUsers
        } catch (error) {
            throw error
        }
    }

    async searchUsersByName(name: string): Promise<User[]>{
        try {
            const usersFromDB = await userModel.find({name: name})
            
            let appUsers: User[] = []
            usersFromDB.forEach(user => {
                const appUser = this.convertDBuserToAppUser(user)
                appUsers.push(appUser)
            });

            return appUsers
        } catch (error) {
            throw error
        }
    }

    async searchUsersByAge(age: number): Promise<User[]>{
        try {
            const usersFromDB = await userModel.find({age: age})
            
            let appUsers: User[] = []
            usersFromDB.forEach(user => {
                const appUser = this.convertDBuserToAppUser(user)
                appUsers.push(appUser)
            });

            return appUsers
        } catch (error) {
            throw error
        }
    }


    async getUserByEmail(email: string): Promise<User>{
        try {
            const userFromDB = await userModel.findOne({email: email})
            if(!userFromDB){
                throw new NotFoundError(`User with this email: ${email} is not exist`)
            }
            const appUser = this.convertDBuserToAppUser(userFromDB)
            return appUser
        } catch (error) {
            throw error
        }
    }


    private convertDBuserToAppUser(userFromDB: IUser): User{
        const user: User = {
            name: userFromDB.name,
            age: userFromDB.age, 
            email: userFromDB.email, 
            password: userFromDB.password, 
            id: userFromDB._id.toString(),
            types: userFromDB.types
       } 
       return user
    }

}