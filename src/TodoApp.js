import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {FaWindowClose, FaPencilAlt, FaPlusSquare} from "react-icons/fa"


export function TodoApp () {

    const [todos, setTodos] = React.useState([])
    const [todo, setTodo] = React.useState("")
    const [todoEditing, setTodoEditing] = React.useState(null)
    const [editingText, setEditingText] = React.useState("")
    // const [status, setStatus] = React.useState("")

    //retrieve our local storage
    React.useEffect(() => {
        const dataStore = localStorage.getItem("todos")
        const retrievedData = JSON.parse(dataStore)

        if (retrievedData) {
        setTodos(retrievedData)
        }
    }, [])

    //store our todo entries on a local storage
    React.useEffect(() => {
        const storeEntries = JSON.stringify(todos)
        localStorage.setItem("todos", storeEntries)
    }, [todos])

    // handles SubmitEvent
    function handleSubmit(e) {
        e.preventDefault()

        const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
        status: "open"
        }

        setTodos([...todos].concat(newTodo))
        setTodo("")
    }
    // delete todo entry
    function deleteEntry(id) {
        const updatedEntry = [...todos].filter((todo) => todo.id !== id)

        setTodos(updatedEntry)
    }
    // update todo status
    function setEntryComplete(id) {
        const updatedEntry = [...todos].map((todo) => {
        if (todo.id === id) {
            todo.completed =!todo.completed
            if(todo.completed === true) {
                todo.status = "completed"
            }else{
                todo.status = "open"
            }
        }
        return todo
        })
        setTodos(updatedEntry)
    }
    // edit todo entry
    function editEntry(id) {
        const updatedEntry = [...todos].map((todo) => {
        if (todo.id === id) {
            todo.text = editingText
        }
        return todo
        })
        setTodos(updatedEntry)
        setTodoEditing(null)
        setEditingText("")
    }
    
    return(
        <>
         <div className="container tc  d-flex align-items-center justify-content-center">
            <div className="todo-panel" >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card todo-card">
                            <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center">
                                <input className="form-control form-control-lg input-txt" onChange={(e) => setTodo(e.target.value)} value={todo} placeholder="Enter new .." />
                                <div className="col-auto px-0 mx-0 me-4">
                                    <button type="submit" className="btn btn-outline-primary">Add</button>
                                </div>
                            </form>
                            <hr />
                            {todos.map((todo) => 
                                <div className="row align-items-center todo-item editing my-3" key={todo.id}>
                                    <div className="col">
                                        <div className="m-0 p-0 float-end todo-actions">
                                            <input className="form-check-input me-1 my-2" type="checkbox" value="" id="flexCheckDefault" onChange={() => setEntryComplete(todo.id)} checked={todo.completed} />
                                            {todoEditing === todo.id ?
                                                (<FaPlusSquare color='green' className="icon" onClick={() => editEntry(todo.id)} />)
                                            :
                                                (<FaPencilAlt className="me-1 icon" onClick={() => setTodoEditing(todo.id)} />)
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        {todoEditing === todo.id ? 
                                            <input type="text" className="form-control form-control-sm border-1 output-txt  edit-todo-input bg-transparent text-black rounded px-3" onChange={(e) => setEditingText(e.target.value)} onFocus={(e) => setEditingText(e.target.value) } defaultValue={todo.text} />
                                        :
                                            (<div className="output-txt text-black"><h4>{todo.text}</h4></div>)
                                        }
                                    </div>
                                    <div className="col">
                                        <FaWindowClose color='red' className="me-1 icon float-center" onClick={() => deleteEntry(todo.id)} />
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-dark float-start my-2">{todo.status}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </>
    );
}