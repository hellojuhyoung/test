const express = require("express");
const app = express();
const multer = require("multer");
const port = 3000;
// const upload = multer({ dest: "uploads/" });
const path = require("path");

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
//
//This is IMPORTANT due to synchronous state
//serve static files from the 'uploads' directy:
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/uploads", express.static("uploads"));

// app.set("view engine", "ejs");
// app.set("views", "./views");
app.set("view engine", "ejs"); // If using EJS
app.set("views", path.join(__dirname, "views")); // Set the views directory

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/upload", upload.single("files"), (req, res) => {
  //   const fileName = req.file.filename;
  //   console.log("server-side file extension", fileExtension);
  //   console.log("file original name", fileName);
  //   console.log(req.file, "file");
  //   console.log(req.body, "잘 담겼니?");
  //   res.render({ url: `uploads/${req.file.filename}` });

  res.render("main", { url: `/uploads/${req.file.filename}` });
  //   res.send(req.file.filename);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

//in js
// let data = [];
// const dataStorage = localStorage.getItem('data') || [];
// const id = 1;

// data = dataStorage
// //중복체크
// const onclick = () => {
//     axios({
//         method: 'get',
//         url: '/userinfo',
//         params: {id},
//     })
//     .then((res) => {
//         const filterData = data.filter((x) => x.id === id);
//         if (filterData.length > 0) {
//             const div = document.querySelector('.div')
//             중복입니다.
//         } else {
//             중복아님
//         }
//         button disable if the data not exist button enable
//     })
// }
