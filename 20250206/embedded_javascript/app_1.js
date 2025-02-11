const express = require("express");
//3000 for clients
//4000, 5000 for backends
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

//req - request
//res - response
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/app_1", (req, res) => {
  res.render("app_1");
});

app.get("/app_2", (req, res) => {
  res.render("app_2");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//
//
//
// app.get('/', fnction(req,res) {
//   res.send('hello world');
// });

// app.listen(port, function () {
//   console.log(`example app listening on port ${port}`);
// });
