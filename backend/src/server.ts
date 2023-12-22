import express from 'express';
import userRouter from './routes/userRoutes/userRouter'
import adminRouter from './routes/adminRoutes/adminRouter'
import './connections/connection';
import cors from 'cors'
import dotenv from 'dotenv'
import paymentRouter from './routes/paymentRoutes/paymentRoutes';
dotenv.config()
import { Server as SocketIoServer } from 'socket.io';
import http from 'http';
import {join} from 'path'


const port = 5000;
const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials : true
    }
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', userRouter);

app.use('/admin', adminRouter);

app.use('/payment', paymentRouter);

app.use(express.static(join(__dirname,"../../frontend/dist")));

app.get("*", function (req, res) {
  res.sendFile(join(__dirname,"../../frontend/dist/index.html"));
});


io.on('connection', (socket) => {
    console.log('connected to socket.io');
  
    socket.on("setup", (userData) => {
      socket.join(userData);
      console.log('userId:', userData);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("user Joined room: " + room);
    });
  
    socket.on("new message", (msg) => {
      console.log("message: " + msg);
      // Broadcast the message to everyone in the room
      io.to(msg.room).emit("new message", msg);
    });
  });

server.listen(port, () => console.log(`server is running on port: http://localhost:${port}`));