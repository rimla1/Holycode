import { IUser, userModel } from "./user.model";
import { CreateUserInput, EditUserInput, User } from "./user.types";


interface IUserRepository {
    createUser(userInput: CreateUserInput): Promise<User>
    listUser(userId: string): Promise<User>
    listUsers(): Promise<User[]>
    updateUser(userId: string, editUserInput: EditUserInput): Promise<User>
    deleteUser(userId: string): Promise<User>
}

export class UserRepository implements IUserRepository {


    async createUser(userInput: CreateUserInput): Promise<User>{
        try {
            const userToSave = new userModel(userInput)
            const userFromDB = await userToSave.save()
    
            const appUser = this.convertDBuserToAppUser(userFromDB)
    
            console.log(appUser)
            return appUser
        } catch (error) {
            throw error
        }
    }

    async listUser(userId: string): Promise<User>{
        try {
            const userFromDB = await userModel.findById(userId)
            if(!userFromDB){
                throw new Error("User with this ID not found!")
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
                throw new Error("User with this Id does not exist!")
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
                throw new Error(`User with this id: ${userId} does not exist`)
            }
            const appDeletedUser = this.convertDBuserToAppUser(deletedUserFromDB)
            return appDeletedUser
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
       } 
       return user
    }

}