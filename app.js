// достукуємось до наших елементів, щоб мати змогу з ними працювати
const body = document.body;
const container = document.querySelector(".container");
const input = document.querySelector(".input_container input");
const button = document.querySelector(".input_container button");
const list = document.querySelector(".todo_list");
const h1 = document.querySelector(".title");
const themeContainer = document.querySelector(".theme_container");

// створюю кнопки для зміни теми додатку
let buttonMan = document.createElement("button");
buttonMan.id = "brown";
buttonMan.innerText = "Man";

let buttonWoman = document.createElement("button");
buttonWoman.id = "pink";
buttonWoman.innerText = "Woman";

let buttonMainTheme = document.createElement("button");
buttonMainTheme.id = "main";
buttonMainTheme.innerText = "Back to UK";

themeContainer.append(buttonMainTheme);
themeContainer.append(buttonMan);
themeContainer.append(buttonWoman);


let todoList = [];                                                // в цей масив буду записувати кожне нове завдання newTodo

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayTask();
};

button.addEventListener("click", () => {
  //console.log(input.value);
  if (!input.value) return;                                       // якщо поле пусте, то не додаю пусту строку до ul
  let newTodo = {                                                 // кожне нове завдання записую в об'єкт newTodo, а цей об'єкт згодом буде добавлятись в масив todoList
    todo: input.value,
    checked: false,
    attention: false
  };

  todoList.push(newTodo);                                         // додаю завдання в наш масив

  displayTask();
  localStorage.setItem("todo", JSON.stringify(todoList));
  input.value = "";                                               // робимо так, аби в полі додавання задачі не зберігалась інформація про останню задачу
});

function displayTask() {                                          // відображення задач, які вводить користувач
  let displayTask = "";

  if (todoList.length === 0) {
    list.innerHTML = "";
  };

  todoList.forEach(function (item, i) {
    displayTask += `
    <li>
    <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
    <label for="item_${i}" class="${item.attention ? "attention" : ""}">${item.todo}</label>
    <button class="delete" id="btn" data-index="${i}">Delete</button>
    </li>
    <hr class="line" />
    `;
    list.innerHTML = displayTask;
  });
  chekSlyle();
};

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const index = event.target.getAttribute("data-index");
    todoList.splice(index, 1);                                           // видаляю задачу зі списку
    displayTask();                                                       // оновлюю список задач
    localStorage.setItem("todo", JSON.stringify(todoList));              // оновлюю дані в localStorage
  }
});

// стан checked
list.addEventListener("change", function (event) {
  let idCheket = event.target.getAttribute("id");
  let label = list.querySelector("[for=" + idCheket + "]");
  let valueLabel = label.innerHTML;
  //console.log(valueLabel);
  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
    }
  });
  localStorage.setItem("todo", JSON.stringify(todoList));
});

// стан attention
list.addEventListener("contextmenu", function(event) {
  event.preventDefault();
  todoList.forEach((item) => {
    if(item.todo === event.target.innerHTML) {
      //console.log(item.todo)
      item.attention = !item.attention;
      displayTask();
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
}); 

function setStylesMan() {                                                  // функція зміни стилів для зміни теми додатку на man
  document.body.style.backgroundImage = "url(image/man.jpg)";
  container.style.backgroundColor = "#ebcd71";
  button.style.backgroundColor = "#be7c1b";
  h1.style.color = "rgb(136 65 17)";
  h1.style.fontWeight = "bold";

  const btnDelete = document.querySelectorAll(".delete");
  btnDelete.forEach(button => {
    button.style.backgroundColor = "#985a31";
  });

  const line = document.querySelectorAll(".line");
  line.forEach(lineElement => {
    lineElement.style.borderTop = "1px solid #985a31";
  });
}


function setStylesWoman() {                                                 // функція зміни стилів для зміни теми додатку на woman
  document.body.style.backgroundImage = "url(image/woman.jpg)";
  container.style.backgroundColor = "rgb(241, 149, 223)";
  button.style.backgroundColor = "rgb(229 6 155)";

  h1.style.color = "rgb(169, 4, 178)";
  h1.style.fontWeight = "bold";

  const btnDelete = document.querySelectorAll(".delete");
  //console.log(btnDelete)
  btnDelete.forEach(button => {
    button.style.backgroundColor = "rgb(182, 32, 192)";
  });

  const line = document.querySelectorAll(".line");
  line.forEach(lineElement => {
    lineElement.style.borderTop = "1px solid rgb(101, 1, 107)";
  });
}

function setStylesUK() {                                                     // функція зміни стилів для зміни теми додатку на uk
  document.body.style.backgroundImage = "url(image/uk.jpg)";
  container.style.backgroundColor = "#f2e259";
  button.style.backgroundColor = "#0b8dc8";
  h1.style.color = "#1176b8";
  h1.style.fontWeight = "bold";

  const btnDelete = document.querySelectorAll(".delete");
  btnDelete.forEach(button => {
    button.style.backgroundColor = "#d59401";
  });

  const line = document.querySelectorAll(".line");
  line.forEach(lineElement => {
    lineElement.style.borderTop = "1px solid rgb(91, 91, 228)";
  });
}

// додаю дії на кнопки зміни фону додатку
buttonWoman.addEventListener("click", () => {                               
  setStylesWoman();
  localStorage.setItem("changeStyles", "woman");                              // додаю(зберігаю) до localStorage
});

buttonMan.addEventListener("click", () => {
  setStylesMan();
  localStorage.setItem("changeStyles", "man");                                // додаю(зберігаю) до localStorage
});

buttonMainTheme.addEventListener("click", () => {
  setStylesUK();
  localStorage.setItem("changeStyles", "uk");                                 // додаю(зберігаю) до localStorage                 
});


// функція зміни теми додатку, в залежності від кліку на одну з кнопок тем
function chekSlyle() {
  const changeStyle = localStorage.getItem("changeStyles");
  if (changeStyle === "woman") {
    setStylesWoman();
  } else if (changeStyle === "man") {
    setStylesMan();
  } else if (changeStyle === "uk") {
    setStylesUK();
  }
};
chekSlyle();
