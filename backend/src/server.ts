import express from 'express';
import userRouter from './routes/userRoutes/userRouter'
import adminRouter from './routes/adminRoutes/adminRouter'
import './connections/connection';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const port = 5000;
const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', userRouter)

app.use('/admin', adminRouter)

app.listen(port, () => console.log(`server is running on port: http://localhost:${port}`))