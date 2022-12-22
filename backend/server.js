const dotenv = require("dotenv").config();
const express = require("express");
const Task = require("./model/taskModel.js");
const taskRoutes = require("./routes/taskRoute.js")
const cors = require("cors");
const app = express();
//const cors = require('cors');



const connectDB = require("./config/connectDB");

const PORT = process.env.PORT || 5000;
//express middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
//app.use(cors({origin: ["http://localhost:3000", "https://mern-task-app.onrender.com"],}));


//cors
const corsOptions ={
    origin: ["http://localhost:3000", "https://mern-task-app.onrender.com"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//Routes
app.get("/",(req,res)=>{
    res.send("Home Page");
})
app.use("/api/tasks",taskRoutes);
const startserver = async () => {
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
startserver();
