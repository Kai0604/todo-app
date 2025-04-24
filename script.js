const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todolist = document.getElementById("todo-list");
const dateInput = document.getElementById("todo-date");

window.addEventListener("load", () => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    saved.forEach(({text,date}) => addTodo(text,date, false));
});

addButton.addEventListener("click", () => {
    const text = input.value.trim();
    const date = dateInput.value.trim();
    if (text === "") return;
    addTodo(text,date);
    input.value = "";
    dateInput.value="";
});

function addTodo(text,date, shouldSave = true) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <input type="date" class="deadline" value="${date}">
        <button class="delete">削除</button>
    `;
    todolist.appendChild(li);
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveToLocalStorage();
    });
    if (shouldSave) {
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    const todos = []; //このtodosにデータを保存する
    document.querySelectorAll("#todo-list li").forEach(li => {
        const text=li.querySelector("span").textContent;
        const date = li.querySelector(".deadline").value;
        todos.push({text,date});
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

