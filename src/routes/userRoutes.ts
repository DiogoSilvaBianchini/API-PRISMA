import express from 'express'
import {createUser, findAllUsers} from '../controllers/userController'
import {authToken, createToken} from '../middlewares/JWTMiddleware'

const routes = express.Router()

routes.get("/", findAllUsers)
routes.post("/", createUser)
routes.post("/login", createToken)

export default routes