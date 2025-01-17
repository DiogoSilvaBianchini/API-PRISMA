import { NextFunction, Request, Response } from "express";
import {prisma} from '../../prisma/prismaClient'


export const authTask = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const searchItem = await prisma.task.findUnique({
            where: {id: String(id)}
        })

        if(searchItem){
            next()
        }else{
            res.status(400).json({msg: "Nenhuma tarefa foi encontrado", status: 400})
        }
    } catch (error) {
        next(error)
    }
}

export const authTaskItem = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const searchItem = await prisma.taskItem.findUnique({
            where: {id: String(id)}
        })

        if(searchItem){
            next()
        }else{
            res.status(400).json({msg: "Nenhuma tarefa foi encontrado", status: 400})
        }
    } catch (error) {
        next(error)
    }
}