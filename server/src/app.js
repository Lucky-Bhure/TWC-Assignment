import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/UserRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3001;

app.use(cors({
    origin: process.env.API,
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);

app.get("/",(req, res)=> {
    res.send("Server is running")
})

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
});
