import axios from "axios";

export const addNewTask = async (task) => {
  try {
    const res = await axios.post("http://localhost:8081/tasks/", task);
    return res.data;
  } catch (err) {
    return { error: err };
  }
};

export const getTasks = async (task) => {
  try {
    const res = await axios.get("http://localhost:8081/tasks/");
    return res.data;
  } catch (err) {
    return { error: err };
  }
};

export const getTaskInfo = async (taskId) => {
  try {
    const res = await axios.get("http://localhost:8081/tasks/" + taskId);
    return res.data;
  } catch (err) {
    return { error: err };
  }
};
export const editTask = async (task) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/tasks/" + task.taskID,
      task
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};

export const completeTask = async (task) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/tasks/" + task.taskID,
      task
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete("http://localhost:8081/tasks/" + taskId);
    return res.data;
  } catch (err) {
    return { error: err };
  }
};
