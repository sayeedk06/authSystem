import express from "express";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";


const app = express();
const PORT = 3000;

dotenv.config()

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded

//routes
app.use('/api/auth', authRoutes)//needs to be changed
app.use('/api/user', userRoutes)

app.listen(PORT, (err?: Error) => {
    if(!err)
        console.log("Server is successfully running on port "+ PORT);
    else
        console.log("Error occured, server can't start", err);
})