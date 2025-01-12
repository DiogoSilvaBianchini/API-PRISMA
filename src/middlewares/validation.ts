import {Response, Request, NextFunction} from 'express'
import {z} from 'zod'

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserValidate = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        })

        UserValidate.parse(req.body)
        next()
    } catch (error) {
        next(error)
    }
}