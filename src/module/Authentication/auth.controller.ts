import { Request, Response, NextFunction } from "express";
import { UserService } from "../User/user.service";
import { LoginRequest } from "./auth.types";




export class AuthController {
    
    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const {email, password} = req.body
            const loginRequest: LoginRequest = {
                email,
                password,
            }
        return res.json({message: `Hello wolrd, email is ${email}, and password is: ${password}`})
        } catch (error) {
            throw new Error("later error handling")
        }
        
    }
}

