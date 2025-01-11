import express, {Request, Response, NextFunction} from 'express'
import taskRoutes from './tasksRoutes'
import userRoutes from './userRoutes'

export default (app:(any)) => {
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({msg: "Hello World"})
    })
    
    app.use("/task", express.json(),taskRoutes)
    app.use("/user", express.json(), userRoutes)

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({msg: "Página não encontrada", status: 200})
    })
}