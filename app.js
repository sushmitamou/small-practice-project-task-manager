//describe our UI vaariables
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event Listeners
loadEventListeners();

//custom function loadEventListeners()
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //add Task event
    form.addEventListener('submit', addTask)
    //remove task
    tasklist.addEventListener('click', removeTask);
    //clear task
    clearBtn.addEventListener('click', clearTask);
    //fileter task
    filter.addEventListener('keyup', filterTask);
}

//Function addtask()
function  addTask(e){

    if(taskInput.value === ""){
        alert("Add a task");
    }
    else{
        //create element
        const li = document.createElement('li');
        //add class
        li.className = "collection-item";
        //create textnode & append to li
        li.appendChild(document.createTextNode(taskInput.value));
        
        //create a tag
        const link = document.createElement('a');
        //add classname
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //appned li to ul
        tasklist.appendChild(li);

        // add into localstorage
        addDataInLocalStorage(taskInput.value);
    }
    
    e.preventDefault();
}

function addDataInLocalStorage(newTask){
    let tasks2;
    if(localStorage.getItem('tasks2') === null){
        tasks2 = [];
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));
    }
    tasks2.push(newTask);
    localStorage.setItem('tasks2', JSON.stringify(tasks2));

}

function getTasks(){
    let tasks2;

    if(localStorage.getItem('tasks2') === null){
        tasks2 = [];
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));
    }
    tasks2.forEach(function(task){
        const li = document.createElement('li');
        //add class
        li.className = "collection-item";
        //create textnode & append to li
        li.appendChild(document.createTextNode(task));
        
        //create a tag
        const link = document.createElement('a');
        //add classname
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //appned li to ul
        tasklist.appendChild(li);

        
    });
}

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure to delete?")){
            e.target.parentElement.parentElement.remove();

            //remove from locaalstprage
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}  

function removeFromLocalStorage(taskItem){
    let tasks2;

    if(localStorage.getItem('tasks2') === null){
        tasks2 = [];
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));
    }
    tasks2.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks2.splice(index, 1);
        }
    });

    localStorage.setItem('tasks2', JSON.stringify(tasks2));
}

function clearTask(){
    tasklist.innerHTML = ' ';

    // clear all from localstorage
    clearFromLocalStorage();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();

     document.querySelectorAll('.collection-item').forEach(function(task){
         const item = task.firstChild.textContent;

         if(item.toLowerCase().indexOf(text) != -1){
             task.style.display = 'block';
         }
         else{
             task.style.display = 'none';
         }
     });
}
 
function clearFromLocalStorage(){
    localStorage.clear();
}