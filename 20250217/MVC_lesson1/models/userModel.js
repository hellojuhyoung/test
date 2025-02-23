//간단한 데이터 모델 생성
const users = [
  { id: 1, name: "마루", email: "maru@naver.com" },
  { id: 2, name: "강아지", email: "dog@naver.com" },
];

//유저 데이터 전부 가지고 오기
const getAllUsers = () => {
  return users;
};

//id로 해당 하는 유저 찾기
const getUserById = (id) => {
  return users.find((user) => user.id === parseInt(id));
};

//해당 파일에서 만든 함수 내보내기 (모듈화)
module.exports = { getAllUsers, getUserById };
