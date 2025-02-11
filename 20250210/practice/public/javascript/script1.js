let dataStorage = [];
//'fetch' makes request to the server
fetch("/userinfo")
  .then((response) => response.json())
  .then((data) => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    const update_data = JSON.parse(JSON.stringify(data));

    if (storedData) {
      dataStorage = storedData;
      const match_data = storedData.some((match) => _.isMatch(match, data));
      if (match_data) {
        createTable(dataStorage);
      } else {
        dataStorage.push(update_data);
        localStorage.setItem("data", JSON.stringify(dataStorage));
        createTable(dataStorage);
      }
    } else {
      dataStorage.push(update_data);
      localStorage.setItem("data", JSON.stringify(dataStorage));
      createTable(update_data);
    }
  });

function createTable() {
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
