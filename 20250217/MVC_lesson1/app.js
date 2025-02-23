const express = require("express");
const app = express();
const port = 3000;

//라우팅 파일 불러오기
const userRouters = require("./routes/userRoutes");

app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use("/users", userRouters); // '/users'에 대한 요청은 userRoutes로 처리

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");
//this creates the full path to 'views' directory
// app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
