//use filter to create new array when the name matches
// with the localstorage data
//then create a table with the new array
fetch("/usergroup")
  .then((response) => response.json())
  .then((searchID) => {
    const storedData = JSON.parse(localStorage.getItem("data"));

    if (!storedData) {
      alert("No user found");
      window.location.href = "/";
    } else {
      const nameFound = storedData.filter(
        (userName) => userName.name === searchID.userSearch
      );
      if (nameFound.length === 0) {
        alert("No user found");
        window.location.href = "/";
      } else {
        createTable(nameFound);
      }
    }
  });

function createTable(dataStorage = nameFound) {
  const mainWrap = document.querySelector(".main-wrap");

  // Create table element
  const table = document.createElement("table");

  // Create table head
  const tableHead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headerCells = ["Email", "Name", "Age"];

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
          <tr>
            <td id="email" >${data.email}
            <td id="name" >${data.name}
            <td id="age" >${data.age}
          </tr>
        `;
  }
  tableBody.innerHTML = bodyHTML; // Set table body HTML
  table.appendChild(tableBody);
  mainWrap.appendChild(table);
  return table;
}
