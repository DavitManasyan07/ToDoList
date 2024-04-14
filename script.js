const inputElement = document.querySelector("input");
let toDosentence = [];
let id = 0;

let todoObj = {};
if (!localStorage.getItem("todoObj")) {
  localStorage.setItem("todoObj", JSON.stringify(todoObj));
} else {
  todoObj = JSON.parse(localStorage.getItem("todoObj"));
}

for (let key in todoObj) {
  createElement(todoObj[key][0]);
  if (todoObj[key][1]) {
    document.getElementById(`b1${key}`/*key*/).classList.add("text")
  }
}

if (Object.keys(todoObj).length) {
  id = Number(Object.keys(todoObj)[Object.keys(todoObj).length - 1]) + 1;
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
      todoObj[id] = [text];
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
  newButton1.id = `b1${id}`//id;
  newButton2.id = id;
  input.value = "";
  toDosentence = [];
  let elementID = id;

  newButton1.addEventListener("click", () => {
    newButton1.classList.toggle("text");
    if (!todoObj[elementID][1] === true) {
      todoObj[elementID].push(true);
    } else {
      todoObj[elementID].pop();
    }
    localStorage.setItem("todoObj", JSON.stringify(todoObj));
  });

  newButton2.addEventListener("click", () => {
    delete todoObj[elementID];
    localStorage.setItem("todoObj", JSON.stringify(todoObj));
    divB.removeChild(newDiv);
  });
  localStorage.setItem("todoObj", JSON.stringify(todoObj));
  id++;
}
