const inputElement = document.querySelector("input");
let toDosentence = [];
let id = 0;
inputElement.addEventListener("keydown", (el) => {
  let element = el.key;

  if (
    element.charCodeAt(0) >= 32 &&
    element.charCodeAt(0) <= 126 &&
    element.length === 1
  ) {
    toDosentence.push(element);
  } else if (element === "Backspace") {
    toDosentence.pop();
  } else if (element === "Enter") {
    let text = toDosentence.join("");
    if (text) {
      createElement(text);
    }
  }
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  const divB = document.getElementById("divB");
  const btnsArr = [...document.getElementsByClassName("btns")];
  btnsArr.forEach((btn) => {
    divB.removeChild(btn);
  });
});

function createElement(text) {
  let l = id;
  const divB = document.getElementById("divB");
  const newDiv = document.createElement("div");
  const input = document.getElementById("inputB");
  const newButton1 = document.createElement("button");
  const newButton2 = document.createElement("button");

  divB.append(newDiv);
  newDiv.id = id;
  newDiv.className = "btns";
  newDiv.append(newButton1);
  newDiv.append(newButton2);
  newButton1.innerText = text;
  newButton2.innerText = "X";
  newButton1.classList.add("b1");
  newButton2.classList.add("b2");
  newButton1.id = id;
  newButton2.id = id;
  input.value = "";
  toDosentence = [];

  newButton1.addEventListener("click", () => {
    newButton1.classList.toggle("text");
  });

  newButton2.addEventListener("click", () => {
    divB.removeChild(newDiv);
  });

  id++;
}
