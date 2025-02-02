let dataStorage = [];

window.onload = function () {
  if (!localStorage.getItem("data")) {
    return false;
  } else {
    dataStorage = JSON.parse(localStorage.getItem("data"));
    loadDataFromLocalStorage();
  }
};

function clickEvent() {
  saveDataToLocalStorage();
}

function validateInputs() {
  const idInput = document.getElementById("id").value;
  const nameInput = document.getElementById("name").value;
  const ageInput = document.getElementById("age").value;
  const careerInput = document.getElementById("career").value;
  const nicknameInput = document.getElementById("nickname").value;
  let data = {
    userID: idInput,
    userName: nameInput,
    userAge: ageInput,
    userCareer: careerInput,
    userNickname: nicknameInput,
  };
  const validations = [
    validateID,
    validateName,
    validateAge,
    validateCareer,
    validateNickname,
  ];

  function validateID() {
    idList = dataStorage.map((idMap) => idMap.userID);
    idMatch = idList.find((idnum) => idnum === data.userID);
    if (data.userID === idMatch) {
      return false;
    } else if (data.userID === null || data.userID === undefined) {
      return false;
    } else if (data.userID.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  function validateName() {
    if (data.userName === null || data.userName === undefined) {
      return false;
    } else if (data.userName.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  function validateAge() {
    if (parseInt(data.userAge) >= 150) {
      return false;
    } else if (isNaN(parseInt(data.userAge))) {
      return false;
    } else {
      return true;
    }
  }

  function validateCareer() {
    if (data.userCareer.length < 15) {
      return false;
    } else if (data.userCareer === null || data.userCareer === undefined) {
      return false;
    } else if (data.userCareer.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  function validateNickname() {
    nicknameList = dataStorage.map((nicknameMap) => nicknameMap.userNickname);
    nicknameMatch = nicknameList.find(
      (nicknameText) => nicknameText === data.userNickname
    );
    if (data.userNickname === nicknameMatch) {
      return false;
    } else if (data.userNickname.length < 3) {
      return false;
    } else if (data.userNickname === null || data.userNickname === undefined) {
      return false;
    } else if (data.userNickname.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
  return { validations };
}

function Errors() {
  const {
    validations: [
      validateID,
      validateName,
      validateAge,
      validateCareer,
      validateNickname,
    ],
  } = validateInputs();
  const idOutput = document.getElementById("idError");
  const nameOutput = document.getElementById("nameError");
  const ageOutput = document.getElementById("ageError");
  const careerOutput = document.getElementById("careerError");
  const nicknameOutput = document.getElementById("nicknameError");

  if (!validateID()) {
    idOutput.textContent = "중복이거나, 칸이 비어있습니다";
  } else {
    idOutput.textContent = "";
  }

  if (!validateName()) {
    nameOutput.textContent = "칸이 비어있습니다";
  } else {
    nameOutput.textContent = "";
  }

  if (!validateAge()) {
    ageOutput.textContent = "150이상 이거나, 칸이 비어있습니다";
  } else {
    ageOutput.textContent = "";
  }

  if (!validateCareer()) {
    careerOutput.textContent = "최소 15자리이거나, 칸이 비어있습니다";
  } else {
    careerOutput.textContent = "";
  }

  if (!validateNickname()) {
    nicknameOutput.textContent =
      "2자리 미만이거나, 중복, 또는 칸이 비어있습니다";
  } else {
    nicknameOutput.textContent = "";
  }
}

function boolErrors() {
  const inputWrap = document.querySelector(".input-wrap");
  let isEmpty = true;
  let isValid = true;

  if (!inputWrap) {
    return false;
  }

  const errorMessages = inputWrap.querySelectorAll("div");
  const inputTexts = inputWrap.querySelectorAll("input");

  if (errorMessages.length === 0) {
    isValid = true;
  }

  for (const message of errorMessages) {
    if (message.textContent.trim() !== "") {
      isValid = false;
    }
  }

  for (const text of inputTexts) {
    if (text.required && text.value.trim() === "") {
      isValid = false;
    }
    if (text.value.trim() !== "") {
      isEmpty = false;
    }
  }
  if (isEmpty) {
    isValid = false;
  }
  return isValid;
}

// clears input boxes
function clearInputs() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => (input.value = ""));
}

function saveDataToLocalStorage() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const career = document.getElementById("career").value;
  const nickname = document.getElementById("nickname").value;
  let data = {
    userID: id,
    userName: name,
    userAge: age,
    userCareer: career,
    userNickname: nickname,
  };

  //boolean return whether there is data stored or not
  function boolData() {
    let readStorage = JSON.parse(localStorage.getItem("data"));
    if (readStorage === null || readStorage === undefined) {
      return false;
    } else {
      return true;
    }
  }

  if (boolData() === false) {
    if (boolErrors() === true) {
      dataStorage.push(data);
      localStorage.setItem("data", JSON.stringify(dataStorage));
      clearInputs();
      createTable();
    } else {
      Errors();
      return false;
    }
  } else {
    if (boolErrors() === true) {
      dataStorage.push(data);
      localStorage.setItem("data", JSON.stringify(dataStorage));
      clearInputs();
      addRowstoTable(data);
    } else {
      Errors();
      return false;
    }

    // loadDataFromLocalStorage();
    dataStorage = JSON.parse(localStorage.getItem("data"));
  }
}

function loadDataFromLocalStorage() {
  if (dataStorage.length === 0) {
    return false;
  } else {
    createTable();
  }
}

function createTable() {
  const mainWrap = document.querySelector(".main-wrap");
  const headerRow = document.createElement("tr");
  const tableHead = document.createElement("thead");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const headerCells = ["Name", "Age", "Career", "Nickname"];

  headerCells.forEach((cellText) => {
    const th = document.createElement("th");
    th.textContent = cellText;
    th.style.textAlign = "center";
    headerRow.appendChild(th);
  });

  dataStorage.forEach((input) => {
    const row = document.createElement("tr");
    const input_name = document.createElement("td");
    const input_age = document.createElement("td");
    const input_career = document.createElement("td");
    const input_nickName = document.createElement("td");

    input_name.textContent = input.userName;
    input_age.textContent = input.userAge;
    input_career.textContent = input.userCareer;
    input_nickName.textContent = input.userNickname;

    input_name.classList.add("input_name");
    input_age.classList.add("input_age");
    input_career.classList.add("input_career");
    input_nickName.classList.add("input_nickName");

    row.appendChild(input_name);
    row.appendChild(input_age);
    row.appendChild(input_career);
    row.appendChild(input_nickName);

    tableBody.appendChild(row);
  });
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  mainWrap.appendChild(table);
}

// add rows to table
function addRowstoTable(data) {
  const dataArray = [data];
  const table = document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  dataArray.forEach((userInput) => {
    const row = document.createElement("tr");
    const addCells = ["userName", "userAge", "userCareer", "userNickname"].map(
      (user) => {
        const addCell = document.createElement("td");
        addCell.textContent = userInput[user];
        return addCell;
      }
    );
    row.append(...addCells);
    tableBody.appendChild(row);
  });
}
