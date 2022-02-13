import React from 'react';
import { Link } from 'react-router-dom';


const ToDoItem = ({ todo, deleteToDo }) => {
    if (todo.is_active === true) {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.creator}
            </td>
            <td>
                <button onClick={() => deleteToDo(todo.url)} type='button'>Delete</button>
            </td>
        </tr>
    )} else {
        return (
            null
        )}

}

const ToDoList = ({ todos, deleteToDo }) => {
    return (
        <div>
            <table>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Creator
                </th>
                <th></th>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}


export default ToDoList;
