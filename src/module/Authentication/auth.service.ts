import { UserService } from "../User/user.service";
import { LoginRequest, LoginResponse } from "./auth.types";
import bcrypt from "bcrypt"
import { DoesNotExistsError } from "../../shared/errors";

interface IAuthService{
    login(loginRequest: LoginRequest): Promise<LoginResponse>
}

export class AuthService implements IAuthService {
    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse>{
        try {
            const response = {
                user_id: "asdjoaisdjasdasdodaiodsa",
                token: "uisdfhijdfiasjdfjiosadfasidjfoasjifso"
            }
            const user = await this.userService.getUserByEmail(loginRequest.email)
            const doesMatch = await bcrypt.compare(loginRequest.password, user.password)
            if(!doesMatch){
                throw new DoesNotExistsError("Your password is incorrect please try again!")
            }
            
            return response

        } catch (error) {
            throw error
        }
    }
}