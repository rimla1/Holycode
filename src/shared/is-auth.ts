import { Response ,NextFunction } from "express";
import {config} from 'dotenv'
config()
import jwt from "jsonwebtoken"
import { NotAuthenticated, NotFoundError, UnexpectedError } from "./errors";
import { RequestWithUserData, UserTokenData } from "./shared.types";


export = (req: RequestWithUserData, res: Response, next: NextFunction) => {
    let secretToken: string
    if(process.env.ACCESS_TOKEN_SECRET){
    secretToken = process.env.ACCESS_TOKEN_SECRET
    }  else {
    throw new UnexpectedError("Something went wrong!")
}

    const token = req.get("Authorization")?.split(" ")[1]
    if(!token){
        throw new NotFoundError("No Token provided!")
    }

    try {
        const userTokenData = jwt.verify(token as string, secretToken) as UserTokenData
        req.user = userTokenData
    } catch (error) {
        throw new NotAuthenticated("Not Authenticated!")
    }

    next()
}