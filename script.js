const inputElement = document.querySelector("input");
const add = document.getElementById("add");
let toDosentence = [];
let todoObj = {};
let id = 0;

if (!localStorage.getItem("todoObj")) {
  localStorage.setItem("todoObj", JSON.stringify(todoObj));
} else {
  todoObj = JSON.parse(localStorage.getItem("todoObj"));
}
if (Object.keys(todoObj).length) {
  id = Number(Object.keys(todoObj)[Object.keys(todoObj).length - 1][2]) + 1;
}

for (let key in todoObj) {
  id = key[2];
  createElement(todoObj[key][0]);
}

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
      todoObj[`b1${id}`] = [text, false];
      createElement(text);
    }
  }
  add.addEventListener("click", () => {
    let text = toDosentence.join("");
    if (text) {
      todoObj[`b1${id}`] = [text, false];
      createElement(text);
    }
  });
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  const divB = document.getElementById("divB");
  const btnsArr = [...document.getElementsByClassName("btns")];
  btnsArr.forEach((btn) => {
    divB.removeChild(btn);
  });
  localStorage.clear();
  todoObj = {};
  id = 0;
  localStorage.setItem("todoObj", JSON.stringify(todoObj));
});

function createElement(text) {
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
  newButton1.id = `b1${id}`;
  newButton2.id = id;
  input.value = "";
  toDosentence = [];
  let elementID = id;

  let newButElid = newButton1.id;

  if (todoObj[newButElid][1]) {
    newButton1.classList.toggle("text");
  }

  newButton1.addEventListener("click", () => {
    newButton1.classList.toggle("text");
    if (!todoObj[newButElid][1]) {
      todoObj[newButElid][1] = true;
    } else {
      todoObj[newButElid][1] = false;
    }
    localStorage.setItem("todoObj", JSON.stringify(todoObj));
  });

  newButton2.addEventListener("click", () => {
    delete todoObj[newButElid];
    localStorage.setItem("todoObj", JSON.stringify(todoObj));
    divB.removeChild(newDiv);
  });
  localStorage.setItem("todoObj", JSON.stringify(todoObj));
  id++;
}
