import express from 'express'
import {createUser, findAllUsers, updateUser} from '../controllers/userController'
import {authToken, createToken} from '../middlewares/JWTMiddleware'

const routes = express.Router()

routes.get("/", findAllUsers)
routes.post("/", createUser)
routes.post("/login", createToken)
routes.put("/", authToken, updateUser)

export default routes