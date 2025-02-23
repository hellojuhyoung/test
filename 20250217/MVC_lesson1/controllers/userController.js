const userModel = require("../models/userModel");

//유저 전부 가져오는 컨트롤러
const getUsers = (req, res) => {
  //가져오기
  const users = userModel.getAllUsers();
  //내보내기
  res.render("users/index", { users });
};

//해당하는 유저 가져오기
//since it's get request the data is stored in params
const getUser = (req, res) => {
  //가져오기
  const user = userModel.getUserById(req.params.id);
  if (user) {
    //내보내기
    res.render("users/show", { user });
  } else {
    res.status(404).send("해당하는 유저가 없습니다");
  }
};

module.exports = { getUsers, getUser };
