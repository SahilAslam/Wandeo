"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRoutes/userRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRoutes/adminRouter"));
const morgan_1 = __importDefault(require("morgan"));
require("./connections/connection");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes/paymentRoutes"));
dotenv_1.default.config();
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const path_1 = require("path");
const port = 5000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', userRouter_1.default);
app.use('/admin', adminRouter_1.default);
app.use('/payment', paymentRoutes_1.default);
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.static((0, path_1.join)(__dirname, "../../frontend/dist")));
app.get("*", function (req, res) {
    res.sendFile((0, path_1.join)(__dirname, "../../frontend/dist/index.html"));
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
        io.to(msg.room).emit("new message", msg);
    });
});
server.listen(port, () => console.log(`server is running on port: http://localhost:${port}`));
