document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add').addEventListener('click', addTask);
document.getElementById('container').addEventListener('click', modifyTask);

let tasks = [];

function addTask(e) {
    const taskInput = document.querySelector('input');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push(taskText);
    updateLocalStorage();
    renderTasks();
    taskInput.value = '';
    e.preventDefault();
}

function renderTasks() {
    const taskList = document.getElementById('container');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const card = createTaskElement(task, index);
        taskList.appendChild(card);
    });
}

function createTaskElement(taskText, index) {
    let task = document.createElement("p");
    task.classList.add("task");
    task.textContent = taskText;

    let card = document.createElement("li");
    card.classList.add("card");

    let controls = document.createElement("div");
    controls.classList.add("controls");

    let dlbtn = document.createElement("i");
    dlbtn.setAttribute("class", "fa-solid fa-trash delete");
    dlbtn.setAttribute("type", "button");
    dlbtn.dataset.index = index;

    let editBtn = document.createElement("i");
    editBtn.setAttribute("class", "fa-solid fa-pen-to-square edit");
    dlbtn.setAttribute("type", "button");
    editBtn.dataset.index = index;

    controls.appendChild(dlbtn);
    controls.appendChild(editBtn);

    card.appendChild(controls);
    card.appendChild(task);

    return card;
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    renderTasks();
}

function modifyTask(e) {
    if (e.target.classList.contains('delete')) {
        deleteTask(e.target.dataset.index);
    } else if (e.target.classList.contains('edit')) {
        editTask(e.target.dataset.index);
    } else if (e.target.classList.contains('cancel-btn')) {
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

function editTask(index) {
    const taskText = tasks[index];
    const taskList = document.getElementById('container');
    const card = taskList.children[index];
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.classList.add('edit-input');
    card.innerHTML = '';
    card.appendChild(input);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    card.appendChild(saveBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn';
    card.appendChild(cancelBtn);

    card.classList.add('edit-mode');

    saveBtn.addEventListener('click', () => saveEdit(index, input.value));
}

function saveEdit(index, newTaskText) {
    tasks[index] = newTaskText;
    updateLocalStorage();
    renderTasks();
}
