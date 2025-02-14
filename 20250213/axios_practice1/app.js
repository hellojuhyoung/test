//npm install express
//npm install ejs
//npm init -y
//npm install multer
//axios image upload
const express = require("express");
const app = express();
const multer = require("multer");
const port = 3000;
// const upload = multer({ dest: "uploads/" });
const path = require("path");
const axios = require("axios");

const uploadDetail = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //원본파일에서 확장자 추출
    const ext = path.extname(file.originalname);
    //파일명에 타임 스탬프와 확장자를 포함시켜서 저장함
    cb(null, Date.now() + ext); //timestamp + file extension
  },
});
//
//multer built in variable name 'storage'
const upload = multer({ storage: uploadDetail });
//

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//
//This is IMPORTANT due to synchronous state
//serve static files from the 'uploads' directy:
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/uploads", express.static("uploads"));

app.set("view engine", "ejs"); // If using EJS
app.set("views", path.join(__dirname, "views")); // Set the views directory

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/upload/single", upload.single("file_single"), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    path: imageUrl,
  });
});

app.post("/upload/multiple", upload.array("file_multiple", 2), (req, res) => {
  const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);
  res.json({
    paths: fileUrls,
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
