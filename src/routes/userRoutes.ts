import express from 'express'
import {createUser, deleteUser, findAllUsers, updateUser} from '../controllers/userController'
import {authToken, createToken} from '../middlewares/JWTMiddleware'
import { userValidation } from '../middlewares/validation'
const routes = express.Router()

routes.get("/", findAllUsers)
routes.post("/", userValidation, createUser)
routes.post("/login", createToken)
routes.put("/", authToken, updateUser)
routes.delete("/", authToken, deleteUser)

export default routes