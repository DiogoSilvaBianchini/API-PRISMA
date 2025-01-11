import { Request, Response } from "express";

interface Task {
    id: number,
    description: string
}

let task: Task[] = [];

export const listTask = (req: Request, res: Response): void => {
    res.json(task)
}

export const createTask = (req: Request, res: Response): void => {
    const {description}: {description: string} = req.body
    const newTask: Task = {id: task.length + 1, description: description} 
    task.push(newTask)
    res.status(200).json({msg: newTask, status: 200})
}

interface Params {
    id: number
}

export const updateTask = (req: Request<Params>, res: Response): void => {
    const { description } = req.body
    let { id } = req.params
    id = Number(id)

    const filter = task.filter(task => task.id == id)

    if(filter.length == 0){
        res.status(200).json({results: [], msg: `Nenhum item foi encontrado com o id ${id}`, status: 200})
    }else{
        const newTask: Task = {id, description }
        task = task.filter(data => data.id !== id)
        task.push(newTask)
        res.status(200).json({results: newTask, msg: `Item ID: ${id}, foi atualizado com sucesso`, status: 200})
    }
}

export const deleteTask = (req: Request<Params>, res: Response): void => {
    const {id} = req.params

    task = task.filter((data) => data.id != id)

    res.status(200).json({results: true, msg: `Item ID: ${id}, foi removido com sucesso`, status: 200})
}