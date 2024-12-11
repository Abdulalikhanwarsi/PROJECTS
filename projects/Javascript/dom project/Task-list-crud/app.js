const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const collection = document.querySelector(".collection");
const clearTaskBtn = document.querySelector(".clear-tasks");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = taskInput.value;

  if (!inputValue) {
    alert("please fill the input field");
    return;
  }

  const updatingTaskElement = document.querySelector(".updating-task");

  if (Boolean(updatingTaskElement)) {
    updatingTaskElement.innerHTML = `${inputValue}
    <a href="#" class="delete-item secondary-content">
      <i class="fa fa-edit" style='color:blue;'></i>
      <i class="fa fa-remove" style="color:red;"></i>
    </a>`;

    document
      .querySelectorAll(".collection-item")
      .forEach(function (singleItem) {
        singleItem.classList.remove("updating-task");
      });

    document.querySelector('#task-form input[type="submit"]').value =
      "ADD TASK";
  } else {
    const liElement = document.createElement("li");
    liElement.className = "collection-item";
    liElement.innerHTML = `${inputValue}
  <a href="#" class="delete-item secondary-content">
    <i class="fa fa-edit" style='color:blue;'></i>
    <i class="fa fa-remove" style="color:red;"></i>
  </a>`;

    collection.appendChild(liElement);
  }
  taskInput.value = "";
  saveAllTasksOnLocalStorage();

  //   console.log(liElement);
});
clearTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (confirm("Are you sure ?")) {
    collection.innerHTML = "";
    localStorage.removeItem("tasks");
  }
});

collection.addEventListener("click", function (event) {
  event.preventDefault();
  const currentElement = event.target;

  if (currentElement.className === "fa fa-remove") {
    if (confirm("Are you sure ?")) {
      currentElement.parentElement.parentElement.remove();
      saveAllTasksOnLocalStorage();
    }
  }

  //edit

  if (currentElement.className === "fa fa-edit") {
    taskInput.value = currentElement.parentElement.parentElement.innerText;

    document.querySelector('#task-form input[type="submit"]').value =
      "UPDATE TASK";


    document
      .querySelectorAll(".collection-item")
      .forEach(function (singleItem) {
        singleItem.classList.remove("updating-task");
      });

    currentElement.parentElement.parentElement.classList.add("updating-task");
  }
});


function saveAllTasksOnLocalStorage() {
  const selectAllCollectionItems =
    document.querySelectorAll(".collection-item");
  // console.log(selectAllCollectionItems, "selectAllCollectionItems");

  let tasks = [];
  selectAllCollectionItems.forEach(function (singleCollectionItem) {
    tasks.push(singleCollectionItem.innerText);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", domLoadedFunction);

function domLoadedFunction() {
  const getTasks = JSON.parse(localStorage.getItem("tasks"));

  // console.log(getTasks, "getTasks");

  getTasks.forEach(function (singleTask, index) {
    // console.log(singleTask, "singleTask");

    const liElement = document.createElement("li");
    liElement.className = "collection-item";
    liElement.innerHTML = `${singleTask}
      <a href="#" class="delete-item secondary-content">
        <i class="fa fa-edit" style='color:blue;'></i>
        <i class="fa fa-remove" style="color:red;"></i>
      </a>`;

    collection.appendChild(liElement);
  });
}

const filterInputField = document.querySelector("#filter");

filterInputField.addEventListener("keyup", function (event) {
  const filterInputValue = event.target.value.toLowerCase();

  const getAllLiCollectionItems = document.querySelectorAll(".collection-item");

  getAllLiCollectionItems.forEach(function (singleLiItem) {
    if (singleLiItem.innerText.toLowerCase().indexOf(filterInputValue) !== -1) {
      singleLiItem.style.display = "block";
    } else {
      singleLiItem.style.display = "none";
    }
  });
});

