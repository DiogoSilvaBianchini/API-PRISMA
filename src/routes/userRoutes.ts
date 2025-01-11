import {createUser, findAllUsers} from '../controllers/userController'
import express from 'express'

const routes = express.Router()

routes.get("/", findAllUsers)
routes.post("/", createUser)

export default routes