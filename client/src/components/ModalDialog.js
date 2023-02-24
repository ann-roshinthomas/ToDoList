import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getTaskInfo, editTask, getTasks } from "../features/apiCalls";
import { TiEdit } from "react-icons/ti";
import { IconContext } from "react-icons";

function ModalDialog({ taskId, tasks, setTasks }) {
  const [isShow, setInvokeModal] = React.useState(false);
  const [taskInfo, setTaskInfo] = useState([]);
  const [value, setValue] = useState("");
  const initModal = async () => {
    if (!isShow) {
      const { data, error } = await getTaskInfo(taskId);
      if (error) {
        console.log(error);
      } else {
        setTaskInfo(data[0]);
        setValue(data[0].taskName);
      }
    }

    return setInvokeModal(!isShow);
  };

  const handleSubmit = async () => {
    let updatedData = { taskID: taskId, taskName: value };
    let response = await editTask(updatedData);
    const newTasks = await getTasks();
    if (newTasks) {
      setTasks(newTasks.data);
    }
    initModal();
  };

  return (
    <>
      <Button
        title="Edit"
        style={{
          background: "white",
          width: "31px",
          height: "29px",
          padding: "1px",
          border: "1px solid black",
        }}
        onClick={initModal}
      >
        <IconContext.Provider
          value={{ color: "black", className: "global-class-name" }}
        >
          <div>
            <TiEdit />
          </div>
        </IconContext.Provider>
      </Button>
      <Modal show={isShow} centered>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Edit your to-do Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="btnAdd" onClick={handleSubmit}>
            Submit
          </button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDialog;
