"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRoutes/userRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRoutes/adminRouter"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = __importDefault(require("./connections/connection"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes/paymentRoutes"));
dotenv_1.default.config({ path: __dirname + '../.env' });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const path_1 = require("path");
(0, connection_1.default)();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://wandeo.website",
        "http://localhost:5000",
        "https://wandeo.website",
    ],
    methods: "GET,PUT,PATCH,POST,DELETE",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173", 'https://wandeo.website', 'https://wandeo.website', '*'],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use('/', userRouter_1.default);
app.use('/admin', adminRouter_1.default);
app.use('/payment', paymentRoutes_1.default);
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.static((0, path_1.join)(__dirname, "../../frontend/dist")));
app.get("*", function (req, res) {
    res.sendFile((0, path_1.join)(__dirname, "../../frontend/dist/index.html"));
});
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        console.log("message: ", data);
        socket.broadcast.emit("receive_message", data);
    });
});
server.listen(port, () => console.log(`server is running on port: http://localhost:${port}`));
