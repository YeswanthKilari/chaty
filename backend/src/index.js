import express from 'express'; 
import authRoutes from "./routes/auth.route.js";
import { connectDb } from "./lib/db.js";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    connectDb();
});

//57:19