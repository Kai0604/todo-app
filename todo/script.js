const input=document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todolist = document.getElementById("todo-list");

window.addEventListener("load",()=>{
    const saved = JSON.parse(localStorage.getItem("todos"))||[];
    saved.forEach(addTodo);
});

addButton.addEventListener('click',()=>{
    const text = input.value.trim();
    if(text==="") return;
    addTodo(text);
    saveToLocalStorage();
    input.value="";
});

function addTodo(text){
    const li=document.createElement("li");
    li.innerHTML=`
    <span>${text}</span>
    <button class="delete">削除</button>
    `;
    todolist.appendChild(li);

    li.querySelector(".delete").addEventListener("click",()=>{
        li.remove();
        saveToLocalStorage();
    });
}

function saveToLocalStorage(){
    const todos=[];
    document.querySelectorAll("#todo_list li span").forEach(span=>{
        todos.push(span.textContent);
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}