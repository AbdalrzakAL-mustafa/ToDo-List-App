let tasksArray;
if (localStorage.getItem("tasksArray")) {
  tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
  // Show tasks
  showTasks();
} else {
  tasksArray = [];
}
/* ===================================================================================== */

// Add new task
let addBtn = document.querySelector(".app .header .add");

addBtn.addEventListener("click", function (eve) {
  // Get task name
  let taskName = window.prompt("Enter Your Task Name");

  if (taskName) {
    // Add task to tasks array
    addNewTask(taskName);
  } else {
    alert("Sorry, you did not enter a task name");
  }

  // Show All Tasks
  showTasks();
});

// Add task to tasks array
function addNewTask(taskName) {
  // create object task
  let newTaskObj = {
    taskName: taskName,
    taskDate: getCurrentDate(),
    isDone: false,
  };

  // Add TaskOBJ to TasksArray
  tasksArray.push(newTaskObj);
  saveTasksIntoLocalSTOR();
}
/* ===================================================================================== */

// Show All Tasks into Tasks Container
function showTasks() {
  document.querySelector(".app .tasks").innerHTML = "";

  let taskId = 0;

  for (let task of tasksArray) {
    // Create new task
    let newTask = `
      <div class="task ${task.isDone ? "done" : ""} ">
        <div class="actions">
          <div class="icon edit" onclick="editTask(${taskId})"><i class="fas fa-edit"></i></div>
          <div class="icon status" onclick="changeTaskStatus(${taskId})"><i class="${
      task.isDone ? "fas fa-remove" : "fas fa-check"
    }"></i></div>
          <div class="icon delete" onclick="deleteTask(${taskId})"><i class="fa fa-recycle"></i></div>
        </div>
        <div class="content">
          <p>${task.taskName}</p>
          <div class="date">
          <span>${task.taskDate}</span>
          <i class="fa fa-calendar"></i>
          </div>
          </div>
      </div>`;

    // Add task into tasks Container
    document.querySelector(".app .tasks").innerHTML += newTask;
    // Increment "taskID"
    taskId++;
  }
  console.log("Task Array = ", tasksArray);
}

/* ===================================================================================== */
// Delete Task Function
function deleteTask(taskID) {
  // Delete task from tasksArray
  if (confirm(`Do you want delete the task : ${tasksArray[taskID].taskName}`)) {
    tasksArray.splice(taskID, 1);
    saveTasksIntoLocalSTOR();
    // Re-show Tasks
    showTasks();
  }
}
/* ===================================================================================== */
// check isDone or Not Function
function changeTaskStatus(taskID) {
  tasksArray[taskID].isDone = !tasksArray[taskID].isDone;

  saveTasksIntoLocalSTOR();
  // Re-show Tasks
  showTasks();
}
/* ===================================================================================== */
//Edit task function
function editTask(taskID) {
  // Get new task name
  let taskNewName = window.prompt(
    "Enter Your Task Name",
    tasksArray[taskID].taskName
  );

  // Updating task name & date
  tasksArray[taskID].taskName = taskNewName;
  tasksArray[taskID].taskDate = getCurrentDate();

  saveTasksIntoLocalSTOR();
  // Re-show Tasks
  showTasks();
}
/* ===================================================================================== */
// Delete all tasks
function deleteTasks() {
  let confirm = window.confirm("Do you want delete all the tasks ? ");
  if (confirm) {
    tasksArray = [];

    document.querySelector(".app .tasks").innerHTML = "";
    saveTasksIntoLocalSTOR();
  }
}
/* ===================================================================================== */
function saveTasksIntoLocalSTOR() {
  window.localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}
/* ===================================================================================== */
// Get current date
function getCurrentDate() {
  const date = new Date();
  let taskDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} || ${timeAmPm(date)} `;
  return taskDate;
}

// Get Time In Format AM & PM
function timeAmPm(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + amPm;
  return strTime;
}
