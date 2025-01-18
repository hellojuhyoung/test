// function onetoten() {
//   for (i = 1; i <= 10; i++) {
//     console.log(i);
//   }
// }
// onetoten();
const data = [
  {
    id: 1,
    name: "김철수",
    age: 14,
    careers: [
      { title: "놀기" },
      { title: "먹기" },
      { title: "자기" },
      { title: "숨쉬기" },
    ],
    nickName: [
      { name: "김안철수" },
      { name: "김김안철수" },
      { name: "박터짐" },
    ],
  },
  {
    id: 2,
    name: "영희",
    age: 35,
    careers: [
      { title: "놀기" },
      { title: "자전거타기" },
      { title: "오렌지먹기" },
      { title: "사과부시기" },
    ],
    nickName: [{ name: "김영희" }, { name: "야생사자" }, { name: "오올이" }],
  },
  {
    id: 3,
    name: "박광철",
    age: 20,
    careers: [
      { title: "일수나가기" },
      { title: "돈빌려주기" },
      { title: "공무집행방해하기" },
      { title: "무면허운전하기" },
    ],
    nickName: [
      { name: "대흥역호랑이와사자두마리" },
      { name: "마포불주먹" },
      { name: "전설" },
      { name: "경찰의적" },
    ],
  },
];

// question1
const table = document.createElement("table");
const tableHead = document.createElement("thead");
const tableBody = document.createElement("tbody");

// Create table header row
const headerRow = document.createElement("tr");
const headerCells = ["Name", "Age", "Careers", "Nicknames"];
headerCells.forEach((cellText) => {
  const th = document.createElement("th");
  th.textContent = cellText;
  th.style.textAlign = "center";
  headerRow.appendChild(th);
});
tableHead.appendChild(headerRow);

// Create table data rows
data.forEach((person) => {
  //creating rows; columns are created separately
  const row = document.createElement("tr");

  //creating alert message when a row is clicked
  row.addEventListener("click", () => {
    let personAgeCheck = "";
    if (person.age > 19) {
      personAgeCheck += "성인 입니다";
    } else {
      personAgeCheck += "미성년자 입니다";
    }

    let personInfo = `이름은 ${person.name} 이고, 나이는 ${
      person.age
    }이며 ${personAgeCheck} 커리어에는 ${person.careers
      .map((career) => career.title)
      .join(", ")}가 있고 별명으로는 ${person.nickName
      .map((nickname) => nickname.name)
      .join(", ")}이 있습니다.`;
    alert(personInfo);
  });

  //name
  const nameCell = document.createElement("td");
  nameCell.textContent = person.name;
  nameCell.classList.add("name_cell");
  row.appendChild(nameCell);

  //age
  const ageCell = document.createElement("td");
  ageCell.textContent = person.age;
  ageCell.classList.add("age_cell");
  row.appendChild(ageCell);

  //careers
  const careersCell = document.createElement("td");
  const careersList = document.createElement("ul");
  careersList.classList.add("careers_list");
  person.careers.forEach((career, index) => {
    const careerItem = document.createElement("li");
    careerItem.textContent = career.title;
    careersList.appendChild(careerItem);
  });
  careersCell.appendChild(careersList);
  row.appendChild(careersCell);

  //nickName
  const nickNamesCell = document.createElement("td");
  const nickNamesList = document.createElement("ul");
  nickNamesList.classList.add("nicknames_list");
  person.nickName.forEach((nickname, index) => {
    const nickNameItem = document.createElement("li");
    nickNameItem.textContent = nickname.name;
    nickNamesList.appendChild(nickNameItem);
  });
  nickNamesCell.appendChild(nickNamesList);
  row.appendChild(nickNamesCell);

  //complete making rows and add rows to the table body
  tableBody.appendChild(row);
});

// Append table head and body to table
table.appendChild(tableHead);
table.appendChild(tableBody);

// Get the main-wrap div element
const mainWrap = document.querySelector(".main-wrap");

// Append the table to the main-wrap div
mainWrap.appendChild(table);

//
//
//

//question2
const adults = data.filter((person) => person.age >= 19);
const minors = data.filter((person) => person.age < 19);

function createPersonText(person) {
  const careersList = person.careers.map((career) => career.title).join(", ");
  const nicknamesList = person.nickName
    .map((nickname) => nickname.name)
    .join(", ");
  return ` ${person.name}의 커리어는 ${careersList} 가 있으며 별명은 ${nicknamesList} 입니다.`;
}

function getPluralNames(people) {
  if (people.length === 1) {
    return `${people[0].name}이 있고`;
  } else {
    return (
      people
        .map((person) => person.name)
        .slice(0, -1)
        .join(", ") +
      ", " +
      people[people.length - 1].name +
      "이 있고"
    );
  }
}

// Minors section
const minorsText = document.createElement("div");
minorsText.classList.add("minors");
minorsText.textContent = `1. 미성년자는 ${getPluralNames(minors)}`;
minorsText.textContent += minors.map(createPersonText).join(", ");
mainWrap.appendChild(minorsText);

// Adults section
const adultsText = document.createElement("div");
adultsText.classList.add("adults");
adultsText.textContent = `2. 성인은 ${getPluralNames(adults)}`;
adultsText.textContent += adults.map(createPersonText).join(", ");
mainWrap.appendChild(adultsText);

//
//
//

function findLongestNickname(person) {
  let longestNickname = "";
  person.nickName.forEach((nickname) => {
    if (nickname.name.length > longestNickname.length) {
      longestNickname = nickname.name;
    }
  });
  return longestNickname;
}

// find the longest nickname out of all the people
function findPersonWithLongestNickname(people) {
  let personWithLongest = people[0];
  people.forEach((person) => {
    if (
      findLongestNickname(person).length >
      findLongestNickname(personWithLongest).length
    ) {
      personWithLongest = person;
    }
  });
  return personWithLongest;
}

// Find the person with the longest nickname
const personWithLongestNickname = findPersonWithLongestNickname(data);
const longestNicknameInfo = document.createElement("div");
longestNicknameInfo.classList.add("longestNicknameInfo");
longestNicknameInfo.textContent = `3. 별명이 제일 긴 이름은 ${
  personWithLongestNickname.name
} "${findLongestNickname(personWithLongestNickname)}" 입니다.`;
mainWrap.appendChild(longestNicknameInfo);
