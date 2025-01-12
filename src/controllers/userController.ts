import {Request, Response} from 'express'
import { genSalt, hash } from "bcryptjs"
import { prisma } from '../../prisma/prismaClient'

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

export const createUser = async (req: Request, res: Response) => {
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
}