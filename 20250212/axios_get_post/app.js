const express = require("express");
// const { userInfo } = require("os");
const app = express();
const port = 3000;
const path = require("path");
//fs: in node.js code is how you import and make available
//'fs' is the name of the built-in file system module
// const viewsDirectory = path.join(__dirname, "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.set("view engine", "ejs");
//this creates the full path to 'views' directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("main");
});

//server and client are independent of eachother
//the information after ? gets rendered
app.get("/signupInfo", (req, res) => {
  const signupInfo = req.query;
  //request to get the query
  //
  //responds to send the data in {}
  res.json({ signupInfo });
});
app.post("/loginInfo", (req, res) => {
  const loginInfo = req.body;
  res.json({ loginInfo });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
