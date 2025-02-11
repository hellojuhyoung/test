const express = require("express");
const { userInfo } = require("os");
//3000 for clients
//4000, 5000 for backends
const app = express();
const port = 3000;

//body-parser
//x-www-form-urlencoded 방식, 객체 형태
app.use(express.urlencoded({ extended: true }));
//json
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");
//req - request
//res - response
app.get("/", (req, res) => {
  res.render("main");
});
//get 요청은 req.query
//정보 보임
app.get("/getForm", (req, res) => {
  console.log(req.query, "요청 왔니?");
  res.render("result", { title: "GET 요청결과", userinfo: req.query });
});
//post 요청은 req.body
//정보 안보임 (정보 등록 목적)
app.post("/postForm", (req, res) => {
  console.log(req.body, "요청 왔니?");
  res.render("result", { title: "POST 요청결과", userinfo: req.body });
});
app.listen(port, () => {
  console.log(`서버실행 ${port}`);
});

//npm init -y
//npm i express
