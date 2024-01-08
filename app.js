//Document is the DOM can be accessed in the console with document.window.
//Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


//Event handling, user interaction is what starts the code execution.
const taskInput = document.getElementById("new-task"),
      addButton = document.querySelector(".btn-add"),
      incompleteTaskHolder = document.getElementById("todo"),
      completedTasksHolder = document.getElementById("completed");

//New task list item
const createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li"),
      checkBox = document.createElement("input"),
      label = document.createElement("label"),
      editInput = document.createElement("input"),//text
      editButton = document.createElement("button"),
      deleteButton = document.createElement("button"),
      deleteButtonImg = document.createElement("img");
  listItem.className = 'task-list__item';
  label.innerText = taskString;
  label.className = "task__label";
  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input task__input_todo";

  editButton.innerText = "Edit";
  editButton.className = "btn btn-edit";

  deleteButton.className = "btn btn-del";
  deleteButtonImg.className = 'btn-del__img';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}

//Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode,
        editInput = listItem.querySelector('.task__input_todo'),
        label = listItem.querySelector(".task__label"),
        editBtn = listItem.querySelector(".btn-edit"),
        containsClass = listItem.classList.contains("edit-mode");
  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask = function() {
  console.log("Delete Task...");

  const listItem = this.parentNode,
        taskList = listItem.parentNode;
  taskList.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

const taskIncomplete = function() {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".task__checkbox"),
        editButton = taskListItem.querySelector(".btn-edit"),
        deleteButton = taskListItem.querySelector(".btn-del");
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

for (let i=0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i=0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
//Issues with usability don't get seen until they are in front of a human tester.
//Prevent creation of empty tasks.
//Change edit to save when you are in edit mode.