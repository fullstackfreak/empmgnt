const express = require("express");

const dotenv = require('dotenv')

const userRouter = require("./routes/userRoutes")

// const postRoute = require("./routes/postRoute")

const connectDB = require("./config/db")

// const userCred = require("./milddlewares/userCred")

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())

connectDB();

app.use("/", userRouter)

// app.use("/post", postRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} you can access http://localhost:${PORT}`)
})
