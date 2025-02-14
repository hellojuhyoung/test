// import axios from "axios";
function singleUpload() {
  const formData = new FormData();
  const fileInput = document.getElementById("file_single");
  const file = fileInput.files[0];

  formData.append("file_single", file);

  axios({
    method: "POST",
    url: "/upload/single",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(function (response) {
    document.getElementById("singleImage").src = response.data.path;
  });
}

function multipleUploads() {
  const formData = new FormData();
  const fileInput = document.getElementById("file_multiple");

  for (const file of fileInput.files) {
    formData.append("file_multiple", file);
  }
  axios({
    method: "POST",
    url: "/upload/multiple",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(function (response) {
    const container = document.getElementById("container_multiple");

    response.data.paths.forEach((imageUrl) => {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.style.width = "300px";
      container.appendChild(img);
    });
  });
}
