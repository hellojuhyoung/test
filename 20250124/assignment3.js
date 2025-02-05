//globally declared variables
let dataStorage = [];
let userLookup = {};

//upon load of the html page the following is executed
window.onload = function () {
  if (!localStorage.getItem("data")) {
    return false;
  } else {
    dataStorage = JSON.parse(localStorage.getItem("data"));
    loadDataFromLocalStorage();
  }
};

//executes function upon button click
function clickEvent() {
  saveDataToLocalStorage();
}

//series of validations are executed and
//returns the object validate functions as an array validations
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

//throws error messages if a validate function returns true or false
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

  function isIDValid() {
    if (!validateID()) {
      idOutput.textContent = "중복이거나, 칸이 비어있습니다";
      return false;
    } else {
      idOutput.textContent = "";
    }
    return true;
  }

  function isNameValid() {
    if (!validateName()) {
      nameOutput.textContent = "칸이 비어있습니다";
      return false;
    } else {
      nameOutput.textContent = "";
    }
    return true;
  }

  function isAgeValid() {
    if (!validateAge()) {
      ageOutput.textContent = "150이상 이거나, 칸이 비어있습니다";
      return false;
    } else {
      ageOutput.textContent = "";
    }
    return true;
  }

  function isCareerValid() {
    if (!validateCareer()) {
      careerOutput.textContent = "최소 15자리이거나, 칸이 비어있습니다";
      return false;
    } else {
      careerOutput.textContent = "";
    }
    return true;
  }

  function isNicknameValid() {
    if (!validateNickname()) {
      nicknameOutput.textContent =
        "2자리 미만이거나, 중복, 또는 칸이 비어있습니다";
      return false;
    } else {
      nicknameOutput.textContent = "";
    }
    return true;
  }
  return [isIDValid, isNameValid, isAgeValid, isCareerValid, isNicknameValid];
}

//attaches an event listener to the 'input' event on the document
//(or a specific element). The function you provide will be executed
//whenever the 'input' event occurs on any element that triggers it
document.addEventListener("input", function (event) {
  const [isIDValid, isNameValid, isAgeValid, isCareerValid, isNicknameValid] =
    Errors();
  //on the first keystroke('j'), event.target will be the
  //<input type='text' id='username'> element
  if (event.target.id === "id") {
    //then using .value grabs the value of the input
    //since it's inside the function argument it runs the function
    //with the specific input value
    isIDValid(event.target.value);
  } else if (event.target.id === "name") {
    isNameValid(event.target.value);
  } else if (event.target.id === "age") {
    isAgeValid(event.target.value);
  } else if (event.target.id === "career") {
    isCareerValid(event.target.value);
  } else if (event.target.id === "nickname") {
    isNicknameValid(event.target.value);
  }
});

//checks if error messages are empty or not then
//returns true or false
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

//with the click of the button the data in the input boxes
//are saved onto the local storage (based on conditions)
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

  //checks series of conditions such as data or error
  //checks if there is data stored on the localstorage
  //checks if there are any existing errors
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
  // if (dataStorage.length === 0) {
  //   return false;
  // } else {
  //   createTable();
  // }

  if (dataStorage.length === 0) {
    return false;
  } else {
    dataStorage = JSON.parse(localStorage.getItem("data"));
    dataStorage.forEach((user) => {
      userLookup[user.userID] = user;
    });
    createTable();
  }
}

//creates table in the input-wrap tag from the html
function createTable() {
  const mainWrap = document.querySelector(".main-wrap"); //html mian-wrap is selected
  const headerRow = document.createElement("tr"); //table headerrow is generated
  const tableHead = document.createElement("thead"); //table head is generated
  const table = document.createElement("table"); //table is genereated
  const tableBody = document.createElement("tbody"); //table body is generated
  const headerCells = ["Name", "Age", "Career", "Nickname", "Edit / Delete"]; //header cell with their names

  //loops through to create the header of the table
  headerCells.forEach((cellText) => {
    const th = document.createElement("th");
    th.textContent = cellText;
    th.style.textAlign = "center";
    headerRow.appendChild(th);
  });

  //accesses dataStorage array then loops through to create
  //table elements; cells
  dataStorage.forEach((input) => {
    const row = document.createElement("tr");
    // const input_id = document.createElement("td");
    const input_name = document.createElement("td");
    const input_age = document.createElement("td");
    const input_career = document.createElement("td");
    const input_nickName = document.createElement("td");
    const action_cell = document.createElement("td");
    const edit_button = document.createElement("button");
    const delete_button = document.createElement("button");

    // add the userID as a data attribute
    edit_button.dataset.userID = input.userID;
    delete_button.dataset.userID = input.userID;

    edit_button.addEventListener("click", () => editButton(row, input.userID));

    delete_button.addEventListener("click", function () {
      const userID = this.dataset.userID;
      delete_button(userID);
    });

    //the text format in html declared
    input_name.textContent = input.userName;
    input_age.textContent = input.userAge;
    input_career.textContent = input.userCareer;
    input_nickName.textContent = input.userNickname;

    input_name.dataset.property = "userName";
    input_age.dataset.property = "userAge";
    input_career.dataset.property = "userCareer";
    input_nickName.dataset.property = "userNickname";

    edit_button.textContent = "Edit";
    delete_button.textContent = "Delete";

    // input_id.classList.add("input_id");
    input_name.classList.add("input_name");
    input_age.classList.add("input_age");
    input_career.classList.add("input_career");
    input_nickName.classList.add("input_nickName");
    edit_button.classList.add("edit_button");
    delete_button.classList.add("delete_button");

    //added to row
    action_cell.appendChild(edit_button);
    action_cell.appendChild(delete_button);
    row.appendChild(input_name);
    row.appendChild(input_age);
    row.appendChild(input_career);
    row.appendChild(input_nickName);
    row.appendChild(action_cell);

    //row added to table body
    tableBody.appendChild(row);
  });
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  mainWrap.appendChild(table);

  return table;
}

// add rows to the existing table
function addRowstoTable(data) {
  //declares an array 'dataArray' then temporarily stores the input
  //object data from the html inputs
  const dataArray = [data];
  //generates table elements such as table, table body, buttons
  const table = document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const edit_button = document.createElement("button");
  const delete_button = document.createElement("button");

  edit_button.textContent = "Edit";
  delete_button.textContent = "Delete";

  //for each key in data object, loops through to add cells to
  //the exisitng table generated from the function 'createTable()'
  dataArray.forEach((userInput) => {
    const row = document.createElement("tr");
    //an array of cell names are declared
    const addCells = [
      "userName",
      "userAge",
      "userCareer",
      "userNickname",
      "editandDelete",
    ].map((user) => {
      //upon cell generation the proper object key is stored
      const addCell = document.createElement("td");
      addCell.textContent = userInput[user];
      addCell.appendChild(edit_button);
      addCell.appendChild(delete_button);

      return addCell;
    });
    row.append(...addCells); //generated cells are added to the row
    tableBody.appendChild(row); //then the row is added to the tablebody
  });
}

// function editButton() {
//   const table = createTable();
//   console.log(typeof table, table);
// }

// function editButton(userID, table) {
//   dataStorage = JSON.parse(localStorage.getItem("data"));
//   const userData = dataStorage.find((user) => user.userID === userID);

//   if (userData) {
//     const rows = table.querySelectorAll("tbody tr");
//     let targetRow = null;
//     rows.forEach((row) => {
//       if (row.querySelector("[data-user-i-d]").dataset.userID === userID) {
//         targetRow = row;
//         return;
//       }
//     });

//     if (targetRow) {
//       //replace cells with input boxes
//       for (let i = 0; i < targetRow.cells.length - 1; i++) {
//         //exclude cell with buttons
//         const cell = targetRow.cells[i];
//         const property = cell.dataset.property; //get properties (userID, userName, userAge...)
//         const inputValue = userData[property];

//         //create the input element and set its value
//         let inputElement = cell.querySelector("input");

//         if (!inputElement) {
//           inputElement = document.createElement("input");
//           if (property === "userAge") {
//             inputElement.type = "number";
//           } else {
//             inputElement.type = "text";
//           }
//           cell.innerHTML = "";
//           cell.appendChild(inputElement);
//         }

//         inputElement.value = inputValue;
//       }
//       //change the 'edit' button to 'save'
//       const edit_Button =
//         targetRow.cells[targetRow.cells.length - 1].querySelector("button");
//       edit_Button.textContent = "Save";
//       //remove the old listener
//       edit_Button.removeEventListener("click", arguments.callee);
//       //add the save listener
//       edit_Button.addEventListener("click", () =>
//         saveChanges(targetRow, userID)
//       );
//     }
//   }
// }
//
//
//
//in progress
function editButton(row, userID) {
  const user = userLookup[userID];

  if (user) {
    for (let i = 0; i < row.cells.length - 1; i++) {
      const cell = row.cells[i];
      const property = cell.dataset.property;
      const inputValue = user[property];
      let inputElement = cell.querySelector("input");

      if (!inputElement) {
        inputElement = document.createElement("input");
        inputElement.type = property === "userAge" ? "number" : "text";
        cell.innerHTML = "";
        cell.appendChild(inputElement);
      }
      inputElement.value = inputValue;
    }

    const edit_button = row.cells[row.cells.length - 1].querySelector("button");
    edit_button.textContent = "Save";
    edit_button.removeEventListener("click", arguments.callee); // Remove old listener
    edit_button.addEventListener("click", () => saveChanges(row, userID)); // Add save listener
  }
}
//
//
//
// function saveChanges(row, userID) {
//   dataStorage = JSON.parse(localStorage.getItem("data"));
//   let userUpdate = dataStorage.find((user) => user.userID === userID);

//   for (let i = 0; i < row.cells.length - 1; i++) {
//     const cell = row.cells[i];
//     const inputElement = cell.querySelector("input");
//     const property = cell.dataset.property;
//     userUpdate[property] = inputElement.value;
//   }

//   dataStorage[userUpdate] = userUpdate;
//   localStorage.setItem("data", JSON.stringify(dataStorage));

//   // revert to display mode
//   for (let i = 0; i < row.cells.length - 1; i++) {
//     const cell = row.cells[i];
//     const property = cell.dataset.property;
//     // console.log("save property", property);
//     cell.textContent = userUpdate[property]; //set text from updated userID
//     cell.innerHTML = "";
//     cell.appendChild(document.createTextNode(userUpdate[property]));
//   }

//   // change 'save' back to 'edit'
//   const editButton = row.cells[row.cells.length - 1].querySelector("button");
//   editButton.textContent = "Edit";
//   editButton.removeEventListener("click", arguments.callee);
//   editButton.addEventListener("click", () => editButton(userID, row));
// }

//
//
//
//in progress
function saveChanges(row, userID) {
  for (const user of dataStorage) {
    const userUserID = parseInt(user.userID, 10);
    const userIDasInt = parseInt(userID, 10);

    if (userUserID === userIDasInt) {
      //1. find all input elements in the row
      const inputs = row.querySelectorAll("input");

      //2. diterate through the inputs and update the user object
      inputs.forEach((input) => {
        const propertyName = input.dataset.property;
        user[propertyName] = input.value;
      });

      // for (let i = 0; i < row.cells.length - 1; i++) {
      //   const cell = row.cells[i];
      //   const input = cell.querySelector("input");

      //   if (input) {
      //     const propertyName = Object.keys(user)[i + 1];
      //     user[propertyName] = input.value;
      //   }
      // }

      localStorage.setItem("data", JSON.stringify(dataStorage));

      for (let i = 0; i < row.cells.length - 1; i++) {
        const cell = row.cells[i];
        const propertyName = Object.keys(user)[i + 1];
        cell.textContent = user[propertyName];
        const inputElement = cell.querySelector("input");
        if (inputElement) {
          cell.removeChild(inputElement);
        }
      }
      return;
    }
  }
  // for (const user of dataStorage) {
  //   const userUserID = parseInt(user.userID, 10);
  //   const userIDasInt = parseInt(userID, 10);

  //   if (userUserID === userIDasInt) {
  //     for (let i = 0; i < row.cells.length - 1; i++) {
  //       const cell = row.cells[i];
  //       const property = cell.dataset.property;
  //       let inputElement = cell.querySelector("input");
  //       user[property] = inputElement.value;
  //     }
  //   }
  //   localStorage.setItem("data", JSON.stringify(dataStorage));

  //   for (let i = 0; i < row.cells.length - 1; i++) {
  //     const cell = row.cells[i];
  //     const property = cell.dataset.property;
  //     cell.textContent = user[property];
  //     const inputElement = cell.querySelector("input");
  //     if (inputElement) {
  //       cell.removeChild(inputElement);
  //     }
  //   }
  //   const edit_button = row.cells[row.cells.length - 1].querySelector("button");
  //   edit_button.textContent = "Edit";
  //   edit_button.removeEventListener("click", arguments.callee);
  //   edit_button.addEventListener("click", () => editButton(row, userID));

  //   return;
  // }
}

function deleteButton() {}
