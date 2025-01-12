import { NextFunction, Request, Response } from "express";
import { prisma } from '../../prisma/prismaClient'
import jwt from 'jsonwebtoken'

export const createToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { JWT_SECRET } = process.env
        const { email } = req.body

        const payload = await prisma.user.findUnique({
            where: {email},
            select: {id: true, email: true}
        })

        if(payload){
            const token = jwt.sign(payload, String(JWT_SECRET))
            res.status(200).json({msg:"Token criado com sucesso.", results: token, status: 200})
        }else{
            res.status(400).json({msg: "E-mail ou senha incorretos", status: 400})
        }
    } catch (error) {
        next(error)
    }
}



export const authToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let token = req.headers.authorization
        const { JWT_SECRET } = process.env
        if(token){
            token = token.split(" ")[1]

            const decodeToken = await jwt.verify(token, String(JWT_SECRET))

            next(decodeToken)
        }else{
            res.status(401).json({msg: "Token inválido", results: false, status: 401})
        }

    } catch (error) {
        next(error)
    }
}