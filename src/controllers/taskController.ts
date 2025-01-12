import { NextFunction, Request, Response } from "express";
import { prisma } from '../../prisma/prismaClient'

export const listTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findAllTasks = await prisma.task.findMany()
        res.status(200).json({msg: "Todas as tarefas cadastradas.", results: findAllTasks, status: 200})
    } catch (error) {
        next(error)
    }
}

export const createTask = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { userId, describe } = req.body
        
        await prisma.task.create({
            data: {
                describe,
                userId
            }
        })

        res.status(200).json({msg: "Tarefa criada com sucesso", status: 200})
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {describe} = req.body
        const {id} = req.params

        const updateTask = await prisma.task.update({
            where: {
                id: String(id)
            },
            data: {
                describe
            }
        })

        res.status(200).json({msg: "Tarefa atualizada com sucesso", restuls: updateTask, status: 200})
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        await prisma.task.delete({
            where: {
                id: String(id)
            }
        })
        res.status(200).json({msg: "Task deletada com sucesso!",restuls: true, status: 200})
    } catch (error) {
        next(error)
    }
}