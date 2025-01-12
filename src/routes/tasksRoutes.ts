import {createTask, deleteTask, listTask, updateTask} from '../controllers/taskController'
import express from 'express'
import { authToken } from '../middlewares/JWTMiddleware'

const routes = express.Router()

routes.get("/", listTask)
routes.post("/", createTask)
routes.put("/", updateTask)
routes.delete("/", deleteTask)

export default routes