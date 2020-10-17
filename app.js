const addNewTaskButton = document.getElementById("add-todo-button");
const userInput = document.getElementById("input-todo");    
const taskList = document.getElementById("todo-list");
const filter = document.getElementById("todo-filter");

let currentId = 0;
let tasks = [];

const handleItemClick = (clickedIndex) => {
    tasks = tasks.map((item,index) => {
        return clickedIndex === index ? {
            ...item,
            isDone : !item.isDone,
        } : item;
    })
}
const handleRemoveClick = (clickedIndex) => {
    tasks = tasks.filter((item,index) => index !== clickedIndex);
}

const createNewItem = (data,index) => {
    const item = document.createElement("li");
    item.setAttribute("data-index",data.id);
    item.classList.add("item");
    if (data.isDone){
        item.classList.add("item-checked")
    }

    const textNode = document.createElement("button");
    textNode.classList.add("text");
    
    const text = document.createTextNode(data.text);
    textNode.appendChild(text);

    textNode.addEventListener("click", () => {

        handleItemClick(index) 
        
        renderTasks();

    })

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-task");
    removeButton.innerHTML = "x"
    removeButton.addEventListener("click",() => {

        handleRemoveClick(index);
        renderTasks();
        
    });

    item.appendChild(textNode);
    item.appendChild(removeButton);

    return item;
}


const renderTasks = () => {

    const taskToRender = tasks.map(createNewItem);

    taskList.innerHTML = "";
    
    taskToRender.forEach( (itemElement) => taskList.appendChild(itemElement) );

}


const getUserInput = () => {
    return userInput.value.trim();
}

const addNewTask = () => {

    const newTask = getUserInput();
    if (newTask === "") {
        alert("Please provide a enter todo")
    } else  {
        tasks.push({
            text : newTask,
            id : currentId++,
            isDone: false,
        });

        userInput.value = "";
    
        renderTasks();
    } 
}


const filterTasks = () =>  {
    const filterValue = filter.value.toLowerCase();
    const listItems = document.querySelectorAll(".item");
  
    listItems.forEach( (listItem) =>{
      const text = listItem.textContent.toLowerCase();
  
      if (text.indexOf(filterValue) === -1) {
        // not found
        listItem.setAttribute("style", "display : none !important");
        
      } else {
        listItem.setAttribute("style", "display : flex");
        
      }
    });
    
  }


addNewTaskButton.addEventListener("click",addNewTask);
filter.addEventListener("keyup",filterTasks);
