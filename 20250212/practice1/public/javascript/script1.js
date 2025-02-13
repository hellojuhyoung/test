fetch("/fileIndex")
  .then((response) => response.json())
  .then((filesIndex) => {
    const filesArray = filesIndex.map((fileType) =>
      fileType.replace(".ejs", "")
    );
    const box = document.querySelector(".box");

    filesArray.map((x, i) => {
      const button = document.createElement("button");
      button.textContent = `button${i + 1}`;
      button.onclick = () => pageMove(x);
      box.appendChild(button);
    });

    // for (let index = 0; index < filesArray.length; index++) {
    //   const button = document.createElement("button");
    //   button.textContent = `button ${index + 1}`;
    //   button.onClick = () => pageMove(filesArray[index]);
    //   box.appendChild(button);
    //   console.log(
    //     "filesArray",
    //     index,
    //     filesArray[index],
    //     typeof filesArray[index]
    //   );
    // }
  });

const pageMove = (fileName) => {
  console.log("fileName", fileName);
  window.location.href = `http://localhost:3000/${fileName}`;
  //   axios({
  //     method: "get",
  //     url: `/page${page}`,
  //   }).then((res) => {
  //     window.loction.href("/page1");
  //   });
};

//
//
//
//
//
// //this code can be used inside the 'div' tag by creating 'script'
// // for (let pageNumber = 1; pageNumber <= 20; pageNumber++) {
// //   document.write(
// //     `<button onclick='pageMove(${pageNumber})'>Page${pageNumber}</button>`
// //   );
// // }

// //get the 'div' tag called box
// const box = document.querySelector(".box");

// for (let pageNumber = 1; pageNumber <= 20; pageNumber++) {
//   const button = document.createElement("button");
//   button.textContent = `Page${pageNumber}`;
//   button.onclick = () => pageMove(pageNumber);
//   box.appendChild(button);
// }

// const pageMove = (number) => {
//   window.location.href = `http://localhost:3000/page${number}`;
//   //   axios({
//   //     method: "get",
//   //     url: `/page${page}`,
//   //   }).then((res) => {
//   //     window.loction.href("/page1");
//   //   });
// };
