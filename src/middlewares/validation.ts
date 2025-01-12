import {Response, Request, NextFunction} from 'express'
import {z} from 'zod'


const handleError = (UserValidate:any) => {
    if(!UserValidate.success){
        const {_errors, ...formatedError} = UserValidate.error.format()
        return formatedError
    }else{
        return false
    }
}

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserValidate = z.object({
            name: z.string().nonempty({message: "O nome precisa ser preenchido."}),
            email: z.string().nonempty({message: "E-mail precisa ser preenchido"}).email({message: "O e-mail precisa ser válido."}).min(2, {message: "E-mail não pode ser nulo."}),
            password: z.string().min(5, {message: "A senha precisa ter no minimo 5 caracteres."}),
        }).safeParse(req.body)
        
        const validate = handleError(UserValidate)
        if(validate){
            res.status(400).json({error: validate, results: false, status: 400})
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validateModel = z.object({
            email: z.string().email({message: "E-mail inválido."}),
            password: z.string().nonempty({message: "Senha é obrigátorio."})
        }).safeParse(req.body)
        
        const validate = handleError(validateModel)
        
        if(validate){
            res.status(400).json({error: validate, results: false, status: 400})
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}