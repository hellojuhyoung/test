const express = require("express");
// const { userInfo } = require("os");
const app = express();
const port = 3000;
const path = require("path");
//fs: in node.js code is how you import and make available
//'fs' is the name of the built-in file system module
const fs = require("fs");
const viewsDirectory = path.join(__dirname, "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.set("view engine", "ejs");
//this creates the full path to 'views' directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("main");
});

//to get the index of files in 'views' folder
//fs.readdir: this function reads the contents of a directory asynchronously
app.get("/fileIndex", (req, res) => {
  fs.readdir(viewsDirectory, (_, files) => {
    const fileToExclude = "main.ejs";
    const ejsFiles = files.filter(
      (file) => path.extname(file) === ".ejs" && file !== fileToExclude
    );
    res.json(ejsFiles);
  });
});

app.get("/adadssadqqff2", (req, res) => {
  res.render("adadssadqqff2", { title: "adadssadqqff2" });
});
app.get("/addassd4", (req, res) => {
  res.render("addassd4", { title: "addassd4" });
});
app.get("/adsad2123das", (req, res) => {
  res.render("adsad2123das", { title: "adsad2123das" });
});
app.get("/asddw1w3", (req, res) => {
  res.render("asddw1w3", { title: "asddw1w3" });
});
app.get("/asdsad1231", (req, res) => {
  res.render("asdsad1231", { title: "asdsad1231" });
});
app.get("/asdw1", (req, res) => {
  res.render("asdw1", { title: "asdw1" });
});
app.get("/ddww11", (req, res) => {
  res.render("ddww11", { title: "ddww11" });
});
app.get("/dsddsgga1", (req, res) => {
  res.render("dsddsgga1", { title: "dsddsgga1" });
});
app.get("/dsdsd1", (req, res) => {
  res.render("dsdsd1", { title: "dsdsd1" });
});
app.get("/dw1dwawd", (req, res) => {
  res.render("dw1dwawd", { title: "dw1dwawd" });
});
app.get("/dwawda123", (req, res) => {
  res.render("dwawda123", { title: "dwawda123" });
});
app.get("/dwdwq2124", (req, res) => {
  res.render("dwdwq2124", { title: "dwdwq2124" });
});
app.get("/dww1", (req, res) => {
  res.render("dww1", { title: "dww1" });
});
app.get("/hhjad2", (req, res) => {
  res.render("hhjad2", { title: "hhjad2" });
});
app.get("/qwdjw12", (req, res) => {
  res.render("qwdjw12", { title: "qwdjw12" });
});
app.get("/qwdqdwq41223", (req, res) => {
  res.render("qwdqdwq41223", { title: "qwdqdwq41223" });
});
app.get("/wd12131edda", (req, res) => {
  res.render("wd12131edda", { title: "wd12131edda" });
});
app.get("/wdqwwd221", (req, res) => {
  res.render("wdqwwd221", { title: "wdqwwd221" });
});
app.get("/wqewqe124", (req, res) => {
  res.render("wqewqe124", { title: "wqewqe124" });
});
app.get("/ww11d1w1", (req, res) => {
  res.render("ww11d1w1", { title: "ww11d1w1" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
