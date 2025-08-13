const express = require("express");

const dotenv = require('dotenv');

const cors = require('cors');

const userRouter = require("./routes/userRoutes")

// const postRoute = require("./routes/postRoute")

const connectDB = require("./config/db")

// const userCred = require("./milddlewares/userCred")

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(cors({
    origin:"http://localhost:5173",
     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

// app.get("/", (req, res)=>{
//    let tagline = "No programming concept is complete without a cute animal mascot.";
//     // res.render("index")
//     const users = [
//        { name : "manoj", place: "kochi"},
//        { name : "sunil", place: "tvm"},
//     ]
//     res.render("index",{users})
// })
// app.get("/contact",(req, res)=>{
//     let age = 22;
//     res.render("contact", {age})
// })

app.use("/", userRouter);

// app.use("/post", postRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} you can access http://localhost:${PORT}`)
})
