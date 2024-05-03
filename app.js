let inputValue=document.getElementById("inputvalue");
let btn=document.querySelector(".addBtn");
let mainTodo=document.getElementById("todo-list-element");
let body=document.querySelector("body");


const getlocalTodoList=()=>{
    return JSON.parse(localStorage.getItem("TodoList"));
};



const addTodoListLocalStorage=(localTodoList)=>{
    return localStorage.setItem("TodoList", JSON.stringify(localTodoList));
};

let localTodoList=getlocalTodoList() || [];

const addTodoDyanmic=(currElem)=>{
    const divElement=document.createElement("div");
    divElement.classList.add("main-todo-div");
    divElement.innerHTML=`<li>${currElem}</li><button class="delBtn">Delete</button>`;
    mainTodo.append(divElement);
};

const addTodoList=()=>{

    const todoListValue=inputValue.value.trim();

    inputValue.value="";

    if(todoListValue!=="" && !localTodoList.includes(todoListValue)){
    localTodoList.push(todoListValue);

    localTodoList=[...new Set(localTodoList)];
    console.log(localTodoList);

    localStorage.setItem("TodoList",JSON.stringify(localTodoList));

    addTodoDyanmic(todoListValue);
    }

    // const divElement=document.createElement("div");
    // divElement.classList.add("main-todo-div");
    // divElement.innerHTML=`<li>${inputValue.value}</li><button class="delBtn">Delete</button>`;
    // mainTodo.append(divElement);
    // console.log(divElement);
};

const showTodoList=()=>{
    // console.log(localTodoList);
    localTodoList.forEach((currElem)=>{
         addTodoDyanmic(currElem);
    });
};
showTodoList();

const removeTodoele=(e)=>{
    const todoremove=e.target;
    let parentElem=todoremove.parentElement;
    let todoListCOntent=todoremove.previousElementSibling.innerText;
    console.log(todoListCOntent);

   localTodoList= localTodoList.filter((currTodo)=>{
        return currTodo !==todoListCOntent.toLowerCase();
    });
    addTodoListLocalStorage(localTodoList);
    console.log(localTodoList);
    parentElem.remove();
    
};


mainTodo.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(e.target.classList.contains("delBtn")){
        removeTodoele(e);
    }
});

btn.addEventListener("click",()=>{
    addTodoList();
});


