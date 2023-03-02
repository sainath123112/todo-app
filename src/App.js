import { useState, useEffect } from "react";
import './App.css';

 function Todos(props)
 {
    function removeItem(e)
    {
      props.setName(props.todoArray.filter((el)=>el.id!==props.todo.id));
    }

    function doneItem(e)
    {
      const todo_item = e.target.parentElement.parentElement;
      todo_item.classList.toggle("todo-item-done");  
      if(todo_item.classList.contains("todo-item-done"))
      {
        setBtndone("Undo");
      }
      else 
      {
        setBtndone("Done");
      }
      
    }
const [btndone, setBtndone] = useState("Done");

  return(
    <div className="todo-item">
      <h1>{props.namehead}</h1>
      <div className="todo-item-btns">
      <button className="todo-remove" onClick={removeItem}>Remove</button>
      <button className="todo-done" onClick={doneItem}>{btndone}</button>
      </div>

    </div>
  );
 }


function App() {

  const [newName, setNewname] = useState("");
  const [name, setName] = useState(()=>
       {
        const savedTodos = localStorage.getItem("name");
        if (savedTodos) {
          // return the parsed the JSON object back to a javascript object
          return JSON.parse(savedTodos);
          // otherwise
        } else {
          // return an empty array
          return [];
        }
       }
  );
  useEffect(()=>
  {
    if(name.length===0)
  {
    document.querySelector(".clear-all").style.display="none";
  }
  localStorage.setItem("name", JSON.stringify(name));
  }, [name]);
  


  function addtodo()
  {
    if(newName)
    {
      setName([...name,{
        task:newName,
        id:name.length+1}]);
      setNewname("");
      document.querySelector(".clear-all").style.display="block";
    
    const inputChng = document.querySelector(".todo-input");
    inputChng.value = "";
      }
  }

  function getEnteredtodo(e)
  {
    setNewname(e.target.value);
    
  }
function clearAll()
{
  setName([]);
}

  return (
    <div className="App">
      <h1 className="todo-heading">Todo List</h1>
      <div className="todo-enter">
        <input className="todo-input" type="text" onChange={getEnteredtodo} placeholder="Enter your todo..!"/>
        <button className="todo-add" onClick={addtodo}>ADD</button>
      </div>
      <div className="todo-list">
        {name.map((val)=><Todos key={val.id} namehead={val.task} todoArray={name} todo={val} setName={setName}></Todos>).reverse()}
      </div>
      <button className="clear-all" onClick={clearAll}>clear all</button>
      
    </div>
  );
}

export default App;
