const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"))

if(todos){
    todos.forEach((todo) => addTodo(todo))
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted")
    addTodo();
})

function addTodo(todo) {
    let inputValue = input.value.trim();

    if (todo) {
        inputValue = todo.text;
    }

    if (inputValue) {
        const li = document.createElement("li");

        li.innerText = inputValue;

        if (todo && todo.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            updateLS();
        });

        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            li.remove();
            updateLS();
        });

        ul.appendChild(li);

        input.value = "";

        updateLS();
    }
}
function updateLS() {
    const todosEl = document.querySelectorAll("#todos li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}