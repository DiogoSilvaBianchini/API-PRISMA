import {createTask, deleteTask, listTask, updateTask} from '../controllers/taskController'
import express from 'express'

const routes = express.Router()

routes.get("/", listTask)
routes.post("/", createTask)
routes.put("/:id", updateTask)
routes.delete("/:id", deleteTask)

export default routes