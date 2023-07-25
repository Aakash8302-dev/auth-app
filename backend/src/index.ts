import express,{Request, Response} from 'express'
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes'
import appRoutes from './routes/appRoutes'
import routeRoutes from './routes/routeRoutes'
import connectDB from './utils/db';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();

connectDB();
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/app/', appRoutes)
app.use('/api/user/',userRoutes)
app.use('/api/route/', routeRoutes)

app.use(notFound);
app.use(errorHandler);



app.listen(process.env.PORT, ()=>{
    console.log(`The server is listening on PORT ${process.env.PORT}`)
})