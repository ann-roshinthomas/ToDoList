import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import "./Todo.css";
import {
  addNewTask,
  deleteTask,
  getTasks,
  completeTask,
} from "../features/apiCalls";
import { MdDelete } from "react-icons/md";
import { BiCheckSquare } from "react-icons/bi";
import ModalDialog from "./ModalDialog";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btnAdd">
        Submit
      </button>
    </form>
  );
}

function TodoItem() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await getTasks();
      if (error) {
        console.log(error);
      } else {
        setTasks(data);
        setTasksRemaining(data.filter((task) => !task.completed).length);
        setTasksCompleted(data.filter((task) => task.completed).length);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    let response = await addNewTask({ title });
    let newTasks = await getTasks();
    if (newTasks) {
      setTasks(newTasks.data);
      setTasksRemaining(newTasks.data.filter((task) => !task.completed).length);
      setTasksCompleted(newTasks.data.filter((task) => task.completed).length);
    }
  };

  const completeTaskItem = async (index) => {
    const task = { taskID: index, completed: true };
    let response = await completeTask(task);
    const newTasks = await getTasks();
    if (newTasks) {
      setTasks(newTasks.data);
      setTasksRemaining(newTasks.data.filter((task) => !task.completed).length);
      setTasksCompleted(newTasks.data.filter((task) => task.completed).length);
    }
  };

  const removeTask = async (index) => {
    let response = await deleteTask(index);
    const newTasks = await getTasks();
    if (newTasks) {
      setTasks(newTasks.data);
      setTasksRemaining(newTasks.data.filter((task) => !task.completed).length);
      setTasksCompleted(newTasks.data.filter((task) => task.completed).length);
    }
  };

  return (
    <div className="todo-container">
      <div className="header"> To-do List</div>
      <div
        style={{
          float: "right",
          display: "flex",
          flexDirection: "row",
          gap: "50px",
        }}
      >
        <div>Pending tasks ({tasksRemaining})</div>
        <div>Completed tasks ({tasksCompleted})</div>
      </div>
      <div className="tablediv">
        <table className="dark">
          <thead>
            <tr>
              <th>To-do</th>
              <th colSpan={3} align="center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.length > 0 &&
              tasks.map((task, index) => (
                <tr key={task.taskID}>
                  <td className={task.completed ? "completed-task" : ""}>
                    {task.taskName}{" "}
                  </td>
                  <td>
                    {" "}
                    {!task.completed && (
                      <button
                        title="Mark as completed"
                        className="btn-style"
                        onClick={() => completeTaskItem(task.taskID)}
                      >
                        <BiCheckSquare />
                      </button>
                    )}
                  </td>
                  <td>
                    <ModalDialog
                      taskId={task.taskID}
                      tasks={tasks}
                      setTasks={setTasks}
                    />
                  </td>
                  <td>
                    {" "}
                    <button
                      title="Delete"
                      className="btn-style"
                      onClick={() => removeTask(task.taskID)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            {tasks && tasks.length == 0 && (
              <div className="no-records-div">No Records Found</div>
            )}
          </tbody>
        </table>
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}

export default TodoItem;
