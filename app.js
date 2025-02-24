const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://eugen100:test1234@cluster-main.iy2zu.mongodb.net/';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


// //cookies
// app.get("/set-cookies", (req, res) => {

//   // res.setHeader("Set-Cookie", "newUser=true");

//   res.cookie("newUser", false) //første argument er navn og andre argument er verdi
//   res.cookie("isEmployee", true, {maxAge: 1000 * 60 * 60 * 24,  }); //tredje argument er tiden cookien varer //(secure: true) = secure er https og ikke http
//   res.send("you got the cookie!");

// });

// app.get("/read-cookies", (req, res) =>{

//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);

// });