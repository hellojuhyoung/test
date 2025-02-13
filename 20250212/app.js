const express = require("express");
// const { userInfo } = require("os");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("main");
});
// app.get("/axiosget", (req, res) => {
//   //get request is by req.query
//   console.log(req.query);
//   res.send({ title: "its here" });
// });

app.post("/axiospost", (req, res) => {
  //post request is by req.body
  console.log(req.body);
  res.send({ title: "its here" });
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
