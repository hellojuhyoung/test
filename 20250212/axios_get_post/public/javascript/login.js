function login() {
  const usernameSelect = document.querySelector("input#username");
  const passwordSelect = document.querySelector("input#password");
  const errorSelect = document.getElementById("errorMessage");
  const username = usernameSelect.value;
  const password = passwordSelect.value;

  //if the data i want to send to the server is plain data,
  //then regular object can be used to send the set of data to the server
  //formData is only required for media files 'blob'
  //'blob' binary large objects
  var data = {
    username: username,
    password: password,
    errorMessage: "",
  };

  if (data.username === "abc" && data.password === "123") {
    data.errorMessage = "로그인";
    errorSelect.classList.remove("error-text");
  } else {
    data.errorMessage = "아이디 또는 비밀번호가 일치 하지 않습니다.";
    errorSelect.classList.add("error-text");
  }

  axios({
    method: "POST",
    url: "/loginInfo",
    data: data,
  }).then(function (response) {
    let loginData = response.data.loginInfo;
    errorSelect.innerText = loginData.errorMessage;
  });
}
