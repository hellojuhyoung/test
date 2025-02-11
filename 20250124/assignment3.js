//globally declared variables
let dataStorage = [];

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
function validateInputs(id = null) {
  let IDInput, nameInput, ageInput, careerInput, nicknameInput;
  if (id) {
    IDInput = null;
    nameInput = document.getElementById(`name${id}`).value;
    ageInput = document.getElementById(`age${id}`).value;
    careerInput = document.getElementById(`career${id}`).value;
    nicknameInput = document.getElementById(`nickname${id}`).value;
  } else {
    IDInput = document.getElementById("id").value;
    nameInput = document.getElementById("name").value;
    ageInput = document.getElementById("age").value;
    careerInput = document.getElementById("career").value;
    nicknameInput = document.getElementById("nickname").value;
  }

  let data = {
    userID: IDInput,
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
function Errors(id = null) {
  const {
    validations: [
      validateID,
      validateName,
      validateAge,
      validateCareer,
      validateNickname,
    ],
  } = validateInputs();

  let idOutput, nameOutput, ageOutput, careerOutput, nicknameOutput;
  if (id) {
    idOutput = null;
    nameOutput = document.getElementById(`nameError${id}`);
    ageOutput = document.getElementById(`ageError${id}`);
    careerOutput = document.getElementById(`careerError${id}`);
    nicknameOutput = document.getElementById(`nicknameError${id}`);
  } else {
    idOutput = document.getElementById("idError");
    nameOutput = document.getElementById("nameError");
    ageOutput = document.getElementById("ageError");
    careerOutput = document.getElementById("careerError");
    nicknameOutput = document.getElementById("nicknameError");
  }

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
  if (dataStorage.length === 0) {
    return false;
  } else {
    createTable();
  }
}

//creates table in the input-wrap tag from the html
function createTable() {
  const mainWrap = document.querySelector(".main-wrap");

  // Create table element
  const table = document.createElement("table");

  // Create table head
  const tableHead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headerCells = ["Name", "Age", "Career", "Nickname", "Edit / Delete"];

  let headerHTML = ""; // Build header HTML string
  for (let i = 0; i < headerCells.length; i++) {
    headerHTML += `<th style="text-align: center;">${headerCells[i]}</th>`;
  }
  headerRow.innerHTML = headerHTML; // Set header row HTML
  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  // Create table body
  const tableBody = document.createElement("tbody");
  let bodyHTML = ""; // Build body HTML string

  for (let i = 0; i < dataStorage.length; i++) {
    const data = dataStorage[i];
    bodyHTML +=
      //the whole row is assigned with userID
      //each cell is assigned with userID along with their values
      //imported from the localstorage using 'data.userName' format
      `
      <tr class="tr${data.userID}">
        <td id="name${data.userID}" >${data.userName}
        <div id='nameError${data.userID}'></div></td>
        <td id="age${data.userID}" >${data.userAge}
        <div id='ageError${data.userID}'></div></td>
        <td id="career${data.userID}" >${data.userCareer}
        <div id='careerError${data.userID}'></div></td>
        <td id="nickname${data.userID}">${data.userNickname}
        <div id='nicknameError${data.userID}'></div></td>
        <td class="action_cell">
          <button class="editBtn${data.userID}" onclick="updateData(${data.userID})">Edit</button>
          <button class="delete_button" onclick="deleteData(${data.userID})">Delete</button>
        </td>
      </tr>
    `;
  }
  tableBody.innerHTML = bodyHTML; // Set table body HTML
  table.appendChild(tableBody);
  mainWrap.appendChild(table);
  return table;
}
// row.innerHTML = `<td class='td${id}'}>

// </td>`;

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

// delete
const deleteData = (id) => {
  const trWrap = document.querySelector(`.tr${id}`);
  trWrap.remove();

  const delete_data = dataStorage.filter(
    (currentRow) => Number(currentRow.userID) !== id
  );
  localStorage.setItem("data", JSON.stringify(delete_data));
};

//update data from input box
const updateData = (id) => {
  //selects the edit button and other elements by their id
  const editBtn = document.querySelector(`.editBtn${id}`);
  const nameDocu = document.getElementById(`name${id}`);
  const ageDocu = document.getElementById(`age${id}`);
  const careerDocu = document.getElementById(`career${id}`);
  const nicknameDocu = document.getElementById(`nickname${id}`);

  //upon 'edit' button clicked, changes the text to 'save'
  //when text is changed to 'save', series of elements are converted
  //to input field instead of innerText, the existing values
  //stay in the input boxes
  if (editBtn.innerText == "Edit") {
    editBtn.innerText = "Save";
    nameDocu.innerHTML = `<input id="nameInput${id}" value="${nameDocu.innerText}"} />`;
    ageDocu.innerHTML = `<input id="ageInput${id}" value="${ageDocu.innerText}"} />`;
    careerDocu.innerHTML = `<input id="careerInput${id}" value="${careerDocu.innerText}"} />`;
    nicknameDocu.innerHTML = `<input id="nicknameInput${id}" value="${nicknameDocu.innerText}"} />`;

    //
    //
    //
    const validateRow = document.querySelector(`.tr${id}`);
    console.log(id, validateRow);
    validateRow.addEventListener("input", function (event) {
      const [
        isIDValid,
        isNameValid,
        isAgeValid,
        isCareerValid,
        isNicknameValid,
      ] = Errors();
      console.log("hello world");
      if (event.target.id === `nameInput${id}`) {
        isNameValid(event.target.value);
      } else if (event.target.id === `ageInput${id}`) {
        isAgeValid(event.target.value);
      } else if (event.target.id === `careerInput${id}`) {
        isCareerValid(event.target.value);
      } else if (event.target.id === `nicknameInput${id}`) {
        isNicknameValid(event.target.value);
      }
    });
    //
    //
    //
  } else {
    //other than the case of 'edit' button NOT 'edit'
    //careerInput retrieves the input field value generated in the
    //if statement section, then passes onto careerDocu.innerText
    //where careerDocu is the 'td' element class name
    const nameInput = document.getElementById(`nameInput${id}`).value;
    const ageInput = document.getElementById(`ageInput${id}`).value;
    const careerInput = document.getElementById(`careerInput${id}`).value;
    const nicknameInput = document.getElementById(`nicknameInput${id}`).value;

    nameDocu.innerText = nameInput;
    ageDocu.innerText = ageInput;
    careerDocu.innerText = careerInput;
    nicknameDocu.innerText = nicknameInput;

    const update_data = dataStorage.map((newData) => {
      if (Number(newData.userID) == id) {
        return {
          ...newData,
          userName: nameInput,
          userAge: ageInput,
          userCareer: careerInput,
          userNickname: nicknameInput,
        };
      } else {
        return newData;
      }
    });

    localStorage.setItem("data", JSON.stringify(update_data));

    editBtn.innerText = "Edit";
  }
};

//
//
//
