document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");

  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
  }

  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    monthSelect.appendChild(option);
  }

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }
});

function handleSubmit() {
  // event.preventDefault();

  //name input
  const name = document.getElementById("name").value;

  //radio button
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  let selectedGender;
  for (const input of genderInputs) {
    if (input.checked) {
      selectedGender = input.value;
      break;
    }
  }

  //dob select
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;

  const dob = `${year}-${month}-${day}`;

  const interestInputs = document.querySelectorAll('input[name="interests"]');
  const checkedInterests = Array.from(interestInputs) //generate array of objects
    .filter((input) => input.checked) //first filter to create object with key: value
    .map((input) => input.value); //map through the checkboxes to extract values only

  //create an object and store all the values
  //prior to sending the object to the server
  //FormData is designed for multipart/form-data
  const formData = new FormData();
  formData.append("name", name);
  formData.append("gender", selectedGender);
  formData.append("dob", dob);
  checkedInterests.forEach((interest) =>
    formData.append("interests", interest)
  );

  //convert FormData to a plain object:
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  //show data in object after processing
  //this is before sending 'formDataObject' to the server
  // console.log("-----formDataObject-----");
  // console.log(formDataObject);

  //axios
  //
  axios({
    //request 'GET' method connects to the server
    method: "GET",
    url: "/signupInfo",
    params: formDataObject,
  }).then(function (r) {
    //response to the server and gets stored in the 'data'
    //built in variable called 'data' by axios
    // console.log("--------");
    // console.log(r.data);
    // console.log("Server response:", r.data);
    localStorage.setItem("signupInfo", JSON.stringify(r.data.signupInfo));
  });
  //this can be also be written as
  //where res is a variable, await behaves like '.then'
  //axios(); is the same as axios ({})
  //var res = await axios();
  //console.log(res.data)
}
