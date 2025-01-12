import {Response, Request, NextFunction} from 'express'
import {z} from 'zod'

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserValidate = z.object({
            name: z.string().nonempty({message: "O nome precisa ser preenchido."}),
            email: z.string().nonempty({message: "E-mail precisa ser preenchido"}).email({message: "O e-mail precisa ser válido."}).min(2, {message: "E-mail não pode ser nulo."}),
            password: z.string().min(5, {message: "A senha precisa ter no minimo 5 caracteres."}),
        }).safeParse(req.body)
        
        if(!UserValidate.success){
            const {_errors, ...formatedError} = UserValidate.error.format()
            res.status(400).json({error: formatedError})
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}