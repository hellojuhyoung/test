//local 로 정보등록
//node 에서 js 부르기
//해당하는 user 를 local storage 찾아서 search.ejs로
//메인 페이지 겟 요청 (회원정보 검색)
//회원정보 등록 '포스트' 요청
// '리스트' 페이지로 이동 '회원등록' 버튼 누를시에 (테이블 형식으로 표현)
//회원이 없을경우 '검색된 회원이 없습니다.'

//server-side
const express = require("express");
const { userInfo } = require("os");
const app = express();
const path = require("path");
const port = 3000;
const _ = require("lodash");

let data = "";
let dataStorage = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({ extended: true })); //for form data
// app.use(bodyParser.json()); //to send JSON data

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("main");
});

//pass onto the html page /postForm
//stores the 'form' values as data
//where data is declared as an empty string
app.post("/postForm", (req, res) => {
  data = req.body;
  dataStorage.push(data);

  //if the data is sent from res.render('variable')
  //data cannot be processed through javascript
  //it gets sent as it is
  res.render("userlist");
});

//from the 'script1.js' fetched data as '/userinfo'
//is then retrieved by app.get('/userinfo')
app.get("/userinfo", (req, res) => {
  res.json(data); //send data as json to client
});

app.get("/getForm", (req, res) => {
  data = req.query;
  res.render("search");
});

//server takes in the 'fetch' command
//returns dataStorage json type data
app.get("/usergroup", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`서버실행 ${port}`);
});
