import express from 'express'; 
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())
dotenv.config();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("api/message", messageRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    connectDb();
});

//57:19