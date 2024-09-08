// Categories and Tasks Data
let categories = [
  { title: "Personal", img: "boy.png" },
  { title: "Work", img: "briefcase.png" },
  { title: "Shopping", img: "shopping.png" },
  { title: "Coding", img: "web-design.png" },
  { title: "Health", img: "healthcare.png" },
  { title: "Fitness", img: "dumbbell.png" },
  { title: "Education", img: "education.png" },
  { title: "Finance", img: "saving.png" }
];

let tasks = [
  { id: 1, task: "Go to market", category: "Shopping", completed: false },
  { id: 2, task: "Read a chapter of a book", category: "Personal", completed: false },
  { id: 3, task: "Prepare presentation for meeting", category: "Work", completed: false },
  { id: 4, task: "Complete coding challenge", category: "Coding", completed: false },
  { id: 5, task: "Take a 30-minute walk", category: "Health", completed: false },
  { id: 6, task: "Do a 20-minute HIIT workout", category: "Fitness", completed: false },
  { id: 7, task: "Watch an educational video online", category: "Education", completed: false },
  { id: 8, task: "Review monthly budget", category: "Finance", completed: false },
  { id: 9, task: "Buy groceries for the week", category: "Shopping", completed: false },
  { id: 10, task: "Write in a journal", category: "Personal", completed: false },
  { id: 11, task: "Send follow-up emails", category: "Work", completed: false },
  { id: 12, task: "Work on a coding side project", category: "Coding", completed: false },
  { id: 13, task: "Try a new healthy recipe", category: "Health", completed: false },
  { id: 14, task: "Attend a yoga class", category: "Fitness", completed: false },
  { id: 15, task: "Read an article about a new topic", category: "Education", completed: false },
  { id: 16, task: "Set up automatic bill payments", category: "Finance", completed: false },
  { id: 17, task: "Buy new clothes", category: "Shopping", completed: false },
  { id: 18, task: "Meditate for 10 minutes", category: "Personal", completed: false },
  { id: 19, task: "Prepare agenda for team meeting", category: "Work", completed: false },
  { id: 20, task: "Debug a software issue", category: "Coding", completed: false },
  { id: 21, task: "Try a new recipe for lunch", category: "Health", completed: false },
  { id: 22, task: "Go for a run", category: "Fitness", completed: false },
  { id: 23, task: "Learn a new language online", category: "Education", completed: false },
  { id: 24, task: "Read about history", category: "Education", completed: false },
  { id: 25, task: "Review investment portfolio", category: "Finance", completed: false }
];

// DOM Elements
const menuBtnHome = document.getElementById("menuBtnHome");
const homeScreen = document.querySelector(".homeScreen");
const backBtnCatpage = document.getElementById("backBtnCatpage");
const categoryScreen = document.querySelector(".categoryScreen");
const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskSection = document.querySelector(".addTaskSection");
const cancelBtn = document.querySelector(".cancel-btn");
const blackBackdrop = document.querySelector(".black-backdrop");
const categoriesContainer = document.querySelector(".categoriesSection");
const tasksContainer = document.querySelector(".actualTask");
const categoryTitle = document.querySelector(".categoryTitle");
const totalCategoryTasks = document.querySelector(".categoryTasks");
const categoryImage = document.querySelector(".categoryImage");
const totalTasks = document.querySelector(".totalTasks");
const categorySelect = document.getElementById("category-select");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.getElementById("task-input");

// Variables
let selectedCategory = categories[0];

// Functions
const calculateTotal = () => {
  const categoryTasks = tasks.filter(task => task.category.toLowerCase() === selectedCategory.title.toLowerCase());
  totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

const hideHomeScreen = () => {
  categoryScreen.style.display = "block";
  homeScreen.style.display = "none";
};

const hideCategoryPage = () => {
  homeScreen.style.display = "block";
  categoryScreen.style.display = "none";
  categoryScreen.classList.remove("showCategoryPage");
};

const showTaskSection = () => {
  addTaskSection.style.display = "block";
  blackBackdrop.style.display = "block";
  blackBackdrop.classList.add("active");
};

const hideTaskSection = () => {
  addTaskSection.style.display = "none";
  blackBackdrop.style.display = "none";
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach(category => {
    const categoryTasks = tasks.filter(task => task.category.toLowerCase() === category.title.toLowerCase());

    const div = document.createElement("div");
    div.classList.add("category");
    div.innerHTML = `
      <div class="leftPart">
        <img src="${category.img}" style="width: 50px;" alt="${category.title}">
        <div>
          <h2>${category.title}</h2>
          <p>${categoryTasks.length} Tasks</p>
        </div>
      </div>
      <img src="menuVertical.png" width="42px;" height="38px" style="cursor:pointer;">
    `;

    div.addEventListener("click", () => {
      hideHomeScreen();
      selectedCategory = category;
      categoryTitle.innerHTML = selectedCategory.title;
      categoryImage.src = `${selectedCategory.img}`;
      calculateTotal();
      renderTasks();
    });

    categoriesContainer.appendChild(div);
  });
};

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(task => task.category.toLowerCase() === selectedCategory.title.toLowerCase());

  categoryTasks.forEach(task => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = `
      <div class="taskFormatting">
        <input type="checkbox" id="task-${task.id}" class="inputBox" ${task.completed ? 'checked' : ''} />
        <label for="task-${task.id}">
          <p style="font-size:18px;">${task.task}</p>
        </label>
        <img src="deleteIcon.png" style="cursor:pointer; width: 30px;" class="deleteBtn">
      </div>
    `;
    tasksContainer.appendChild(div);

    const deleteBtn = div.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveToLocalStorage();
      renderTasks();
    });

    const checkbox = div.querySelector(`#task-${task.id}`);
    checkbox.addEventListener("change", () => {
      const taskToUpdate = tasks.find(t => t.id === task.id);
      taskToUpdate.completed = checkbox.checked;
      saveToLocalStorage();
    });
  });

  renderCategories();
  calculateTotal();
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getFromLocalStorage = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  if (localTasks) {
    tasks = localTasks;
  }
};

const populateCategorySelect = () => {
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });
};

const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const category = categorySelect.value;

  if (!task) {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    id: tasks.length + 1,
    task,
    category,
    completed: false
  };

  taskInput.value = "";
  tasks.push(newTask);
  hideTaskSection();
  renderTasks();
  saveToLocalStorage();
  calculateTotal();
};

// Event Listeners
addBtn.addEventListener("click", addTask);
menuBtnHome.addEventListener("click", hideHomeScreen);
backBtnCatpage.addEventListener("click", hideCategoryPage);
addTaskBtn.addEventListener("click", showTaskSection);
cancelBtn.addEventListener("click", hideTaskSection);

// Initialization
populateCategorySelect();
getFromLocalStorage();
renderTasks();
