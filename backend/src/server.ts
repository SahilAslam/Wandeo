import express from 'express';
import userRouter from './routes/userRoutes/userRouter'
import adminRouter from './routes/adminRoutes/adminRouter'
import morgan from 'morgan'
import  connectDB from './connections/connection';
import cors from 'cors'
import dotenv from 'dotenv'
import paymentRouter from './routes/paymentRoutes/paymentRoutes';
dotenv.config({path:__dirname+'../.env'})
import { Server as SocketIoServer } from 'socket.io';
import http from 'http';
import {join} from 'path'

connectDB()
const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://wandeo.website",
    "http://localhost:5000",
    "https://wandeo.website",
  ],
  methods: "GET,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = http.createServer(app);

const io = new SocketIoServer(server, {
  cors: {
    origin: ["http://localhost:5173", 'https://wandeo.website', 'https://wandeo.website', '*'],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use('/', userRouter);

app.use('/admin', adminRouter);

app.use('/payment', paymentRouter);

app.use(morgan('combined'))

app.use(express.static(join(__dirname,"../../frontend/dist")));

app.get("*", function (req, res) {
  res.sendFile(join(__dirname,"../../frontend/dist/index.html"));
});


io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("message: ", data);
    socket.broadcast.emit("receive_message", data);
  });

  // socket.on("setup", (userData) => {
  //   socket.join(userData);
  //   console.log("userId:", userData);
  //   socket.emit("connected");
  // });

  // socket.on("send_message", (data) => {
  //   console.log("message: ", data)
  //   socket.broadcast.emit("receive_message", data);
  // })

  // socket.on("send_message", async (data) => {
  //   console.log("message: ", data);
  //   try {
  //     const { id, message } = data;
  //     socket.broadcast.to(id).emit("receive_message", { message });
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // });

  // socket.on("disconnect", () => {
  //   console.log(`User Disconnected: ${socket.id}`);
  // });
});

server.listen(port, () => console.log(`server is running on port: http://localhost:${port}`));