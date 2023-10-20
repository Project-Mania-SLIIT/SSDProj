const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
app.disable('x-powered-by');
const auth = require('./middleware/auth.js');
require("dotenv").config();
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const PORT = process.env.PORT || 8090;

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{
  
   useNewUrlParser:true,
   useUnifiedTopology:true,

}); 

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB Connected");
});


const userNoteRouter = require("./routes/note.routes.js");
const userRouter = require("./routes/user.routes.js");

app.use("/usernote",userNoteRouter);
app.use("/user",userRouter);






app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})


