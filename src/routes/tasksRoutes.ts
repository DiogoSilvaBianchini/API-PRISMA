import {createTask, deleteTask, deleteTaskItem, listTask, updateTask} from '../controllers/taskController'
import express from 'express'
import { authToken } from '../middlewares/JWTMiddleware'
import {authTask, authTaskItem} from '../middlewares/authTask'
const routes = express.Router()

routes.get("/", listTask)
routes.post("/", authToken, createTask)
routes.put("/:id", updateTask)
routes.delete("/item/:id", authTaskItem, deleteTaskItem)
routes.delete("/:id", authTask, deleteTask)

export default routes