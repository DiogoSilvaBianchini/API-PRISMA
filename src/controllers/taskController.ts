import { NextFunction, Request, Response } from "express";
import { prisma } from '../../prisma/prismaClient'
import { Token } from "../types";
import { filterBody } from '../utils/filterBody'
import { date } from "zod";

export const listTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findAllTasks = await prisma.task.findMany({
            include: {
                TaskItem: true
            }
        })
        res.status(200).json({msg: "Todas as tarefas cadastradas.", results: findAllTasks, status: 200})
    } catch (error) {
        next(error)
    }
}

export const createTask = async (decodeToken: Token,req: Request, res: Response, next:NextFunction) => {
    try {
        const { title, listTask } = req.body
        const { id } = decodeToken
        
        await prisma.task.create({
            data: {
                title,
                TaskItem: {
                    create: listTask
                },
                userId: String(id)
            }
        })

        res.status(200).json({msg: "Item salvo com sucesso!", status: 200})
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const {title, taskList} = req.body
        let payLoad

        if(title){
            payLoad = {title}
        }

        if(taskList){
            payLoad = {
                TaskItem: {
                    update: {
                        where: {id: taskList.id},
                        data: {describe: taskList.describe}
                    }
                }
            }
        }
        
        if(payLoad){
            await prisma.task.update({
                where: {
                    id: String(id)
                },
                data: payLoad
            })
            res.status(200).json({msg: "Dados Atualizados com sucesso!", status: 200})
        }else[
            res.status(400).json({msg: "Dados inválidos", status: 400})
        ]

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

export const deleteTaskItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        await prisma.taskItem.delete({
            where: {
                id: String(id)
            }
        })
        res.status(200).json({msg: "Item deletada com sucesso!",restuls: true, status: 200})
    } catch (error) {
        next(error)
    }
}