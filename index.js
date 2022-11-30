const express = require("express");
const app = express();
require("dotenv").config();
const mentorRouter = require("./routers/mentorRouter");
const studentRouter = require("./routers/studentRouter")


//middleware
app.use(express.json());


app.get("/",function(req,res){
    res.send('Welcome Buddy!!!.');
})


app.use("/mentor",mentorRouter);

app.use("/student",studentRouter);






app.listen(process.env.PORT ||7000);


