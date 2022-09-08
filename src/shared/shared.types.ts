import { Request } from "express"

export type UserTokenData = {types: string[], userId: string, email: string}

export interface RequestWithUserData extends Request
{
    user?: UserTokenData
}