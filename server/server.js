//imports
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const loginRoutes = require("./routes/login");
const usersRoutes = require("./routes/user");
const registerRoutes = require("./routes/register");


mongoose
    .connect(
        "mongodb+srv://asafdarmon1:aw7BFNyTBTKr5wqx@cluster0.obuxe.mongodb.net/services?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to db!");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json()); //parse any incoming data and then call next
//special middleware function.
//A middleware with 4 arguments is recognized as a special error function
app.use((error, req, res, next) => {
    //check if a response has already been sent
    if (res.headerSent) return next(error); //forward the error!

    return res
        .status(error.code || 500) //500 indicates that something went wrong on the server
        .json({ message: error.message || "An unknown error occurred!" });
});


app.use('/users', usersRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
//listen to a specific port
app.listen(5000);