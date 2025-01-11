import express, {Request, Response} from "express"
import routes from "./routes/routes"
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 8082

app.use(morgan("dev"))
routes(app)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
