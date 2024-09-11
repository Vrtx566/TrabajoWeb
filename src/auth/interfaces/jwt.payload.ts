import {Role} from "nest-access-control";

export interface JwtPayload{
    email:string;
    fullName:string;
    roles:string[];
}