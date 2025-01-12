import {NextFunction, Request, Response} from 'express'
import { genSalt, hash } from "bcryptjs"
import { prisma } from '../../prisma/prismaClient'

type token = {
    id: String,
    email: String
}

const encryptPassword = async (password: string) => {
    const salt = await genSalt(10)
    const encryptedPassword = await hash(password, salt)
    return encryptedPassword
}

export const findAllUsers = async (req: Request, res: Response) => {
    console.log("ok")
    const allUsers = await prisma.user.findMany()
    res.status(200).json({msg: "Usuario criado com suceeso!",restuls: allUsers, status: 200})
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body
        const hashPassword = await encryptPassword(password)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })

        res.status(200).json({msg: "Usuario criado com suceeso!", status: 200})
    } catch (error) {
        next(error)
    }
}


const filterBody = (payload: object) => {
    const body = Object.entries(payload)
    const filteredData = body.filter(data => data[1])
    const filteredBody = Object.fromEntries(filteredData) 
    return filteredBody
}

export const updateUser = async (decodeToken:token, req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = decodeToken
        const updateUserData = filterBody(req.body)

        if(updateUserData){
            await prisma.user.update({
                where: {id: String(id)},
                data: {...updateUserData}
            })
    
            res.status(200).json({data: updateUserData})
        }else{
            res.status(401).json({msg: "Dados inválidos",results: false ,status: 401})
        }
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (decodeToken:token, req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = decodeToken
        await prisma.user.delete({where: {id: String(id)}})
        res.status(200).json({msg: "Usuario removido com sucesso!", results: true, status: 200})
    } catch (error) {
        next(error)
    }
}