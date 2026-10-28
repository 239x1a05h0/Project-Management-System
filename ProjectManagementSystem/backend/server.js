const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require("./config/db");
connectDB();
const app=express();
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/projects",require("./routes/projectRoutes"));
app.use("/api/teams",require("./routes/teamRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));
app.get("/",(req,res)=>{
    res.json({
        message:"Project Management API is running"
    });
});

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(
        `Server running on port ${PORT}`
    );
});