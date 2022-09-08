import { UserService } from "../User/user.service";
import { LoginRequest, LoginResponse } from "./auth.types";
import bcrypt from "bcrypt"
import { DoesNotExistsError, UnexpectedError } from "../../shared/errors";
import jwt from "jsonwebtoken"

interface IAuthService{
    login(loginRequest: LoginRequest): Promise<LoginResponse>
}

let secretToken: string
if(process.env.ACCESS_TOKEN_SECRET){
    secretToken = process.env.ACCESS_TOKEN_SECRET
} else {
    throw new UnexpectedError("Something went wrong!")
}

export class AuthService implements IAuthService {
    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse>{
        try {
            const user = await this.userService.getUserByEmail(loginRequest.email)
            const doesMatch = await bcrypt.compare(loginRequest.password, user.password)
            if(!doesMatch){
                throw new DoesNotExistsError("User with this password does not exists")
            }
            const token = jwt.sign({userId: user.id.toString(), email: user.email, types: user.types}, secretToken)
            return ({
                user_id: user.id.toString(),
                token: token
            })

        } catch (error) {
            throw error
        }
    }
}