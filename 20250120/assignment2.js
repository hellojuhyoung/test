let dataSet = [];

function clickEvent() {
  toLocalStorage();
}

const { data } = checkErrors();
const { conditions } = checkErrors();

function checkErrors() {
  const idInput = document.getElementById("id").value;
  const nameInput = document.getElementById("name").value;
  const ageInput = parseInt(document.getElementById("age").value);
  const careerInput = document.getElementById("career").value;
  const nickNameInput = document.getElementById("nickName").value;

  // const idInput = "1";
  // const nameInput = "a";
  // const ageInput = "1";
  // const careerInput = "aaaaaaaaaaaaaaaaaaaa";
  // const nickNameInput = "aaaa";

  let data = {
    idData: idInput,
    nameData: nameInput,
    ageData: ageInput,
    careerData: careerInput,
    nickNameData: nickNameInput,
  };
  const conditions = [checkID, checkName, checkAge, checkCareer, checknickName];

  function checkID(idList) {
    idList = dataSet.map((idMap) => idMap.idNumber);
    idMatch = idList.find((idnum) => idnum === idInput);
    if (idInput === idMatch) {
      return false;
    } else if (idInput === null || idInput === undefined) {
      return false;
    } else if (idInput.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  function checkName() {
    if (nameInput === null || nameInput === undefined) {
      return false;
    } else if (nameInput.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  function checkAge() {
    if (ageInput >= 150) {
      return false;
    } else if (isNaN(ageInput)) {
      return false;
    } else {
      return true;
    }
  }

  function checkCareer() {
    if (careerInput.length < 15) {
      return false;
    } else if (careerInput === null || careerInput === undefined) {
      return false;
    } else if (careerInput.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  function checknickName(nickNameList) {
    nickNameList = dataSet.map((nickNameMap) => nickNameMap.nickNameInput);
    nickNameMatch = nickNameList.find(
      (nickNametxt) => nickNametxt === nickNameInput
    );
    if (nickNameInput === nickNameMatch) {
      return false;
    } else if (nickNameInput.length < 3) {
      return false;
    } else if (nickNameInput === null || nickNameInput === undefined) {
      return false;
    } else if (nickNameInput.trim() === "") {
      return false;
    } else {
      return true;
    }
  }

  return { data, conditions };
}

function executeErrors() {
  const {
    conditions: [checkID, checkName, checkAge, checkCareer, checknickName],
  } = checkErrors();

  const idOutput = document.getElementById("idError");
  const nameOutput = document.getElementById("nameError");
  const ageOutput = document.getElementById("ageError");
  const careerOutput = document.getElementById("careerError");
  const nickNameOutput = document.getElementById("nickNameError");

  if (!checkID()) {
    idOutput.textContent = "중복이거나, 칸이 비어있습니다";
  } else {
    idOutput.textContent = "";
  }
  if (!checkName()) {
    nameOutput.textContent = "칸이 비어있습니다";
  } else {
    nameOutput.textContent = "";
  }
  if (!checkAge()) {
    ageOutput.textContent = "150이상 이거나, 칸이 비어있습니다";
  } else {
    ageOutput.textContent = "";
  }
  if (!checkCareer()) {
    careerOutput.textContent = "최소 15자리이거나, 칸이 비어있습니다";
  } else {
    careerOutput.textContent = "";
  }
  if (!checknickName()) {
    nickNameOutput.textContent =
      "2자리 미만이거나, 중복, 또는 칸이 비어있습니다";
  } else {
    nickNameOutput.textContent = "";
  }

  return [checkID, checkName, checkAge, checkCareer, checknickName];
}

function makeTable() {
  const mainWrap = document.querySelector(".main-wrap");
  const headerRow = document.createElement("tr");
  const tableHead = document.createElement("thead");
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const headerCells = ["Name", "Age", "Career", "Nickname"];
  const {
    data: { idData, nameData, ageData, careerData, nickNameData },
  } = checkErrors();

  headerCells.forEach((cellText) => {
    const th = document.createElement("th");
    th.textContent = cellText;
    th.style.textAlign = "center";
    headerRow.appendChild(th);
  });

  dataSet.forEach((input) => {
    const row = document.createElement("tr");
    const input_name = document.createElement("td");
    const input_age = document.createElement("td");
    const input_career = document.createElement("td");
    const input_nickName = document.createElement("td");

    input_name.textContent = input.nameData;
    input_age.textContent = input.ageData;
    input_career.textContent = input.careerData;
    input_nickName.textContent = input.nickNameData;

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

  return {
    idData,
    nameData,
    ageData,
    careerData,
    nickNameData,
  };
}

// add rows to table
function addRowstoTable(data) {
  const dataArray = [data];
  const table = document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  dataArray.forEach((userInput) => {
    const row = document.createElement("tr");
    const addCells = [
      "nameInput",
      "ageInput",
      "careerInput",
      "nickNameInput",
    ].map((user) => {
      const addCell = document.createElement("td");
      addCell.textContent = userInput[user];
      return addCell;
    });
    row.append(...addCells);
    tableBody.appendChild(row);
  });
}

// clears input boxes
function clearInputs() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => (input.value = ""));
}

window.onload = function () {
  if (!localStorage.getItem("data")) {
    return false;
  } else {
    dataSet = JSON.parse(localStorage.getItem("data"));
    makeTable(dataSet);
  }
};
//
//
//
console.log(data);
console.log(dataSet);

function toLocalStorage() {
  console.log(data);
  console.log(dataSet);

  //if else push and pull data
  if (!localStorage.getItem("data")) {
    if (!checkErrors()) {
      console.log("if if");
      return;
    } else {
      console.log("if else");
      dataSet.push(data);
      console.log(dataSet);
      makeTable(data);
      clearInputs();
      localStorage.setItem("data", JSON.stringify(dataSet));
    }
  }
  //
  else {
    dataSet = JSON.parse(localStorage.getItem("data"));

    if (!checkErrors()) {
      console.log("else if");
      return;
    } else {
      console.log("else else");
      dataSet.push(data);
      clearInputs();
      localStorage.setItem("data", JSON.stringify(dataSet));
      addRowstoTable(data);
    }
  }
}
