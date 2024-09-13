import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { APP_SECRET } from "../config";
import { AdminPayLoad } from "../dto";
import { Request } from "express";
export const GenerateSalt = async() => {
    return await bcrypt.genSalt();
}


export const GeneratePassword = async (password:string, salt:string)=>{
    return await bcrypt.hash(password,salt);
}

export const ValidatePassword = async(enteredPassword:string, savedPassword:string)=>{
    return await bcrypt.compare(enteredPassword,savedPassword)
}

export const GenerateSignature = (payload: AdminPayLoad)=>{
    return jwt.sign(payload, APP_SECRET, {expiresIn: '1d'});
}

export const ValidateSignature = async(req: Request ) => {

    const signature = req.get('Authorization');
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AdminPayLoad;

        req.user = payload;
        return true;
    }
    return false;
}