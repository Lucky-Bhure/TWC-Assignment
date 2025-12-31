import jwt from "jsonwebtoken";

export const generateAccessToken=(userId)=>{
        return jwt.sign({userId:userId},process.env.ACCESS_SECRET,{expiresIn:"1000s"})
}

export const generateRefreshToken=(userId)=>{
        return jwt.sign({userId:userId},process.env.REFRESH_SECRET,{expiresIn:"30s"})
}