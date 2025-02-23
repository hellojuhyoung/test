const express = require("express");
const app = express();
const port = 3000;
const itemsRouter = require("./routes/itemsRoutes");

app.use(express.urlencoded({ extended: true }));
app.use("/itemsDisplay", itemsRouter);

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

//opens index ejs file with '/'
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
