import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Task = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const formattedDate = new Date(task.dateAdded).toLocaleDateString();
  return (
    <div className={`Todo ${task.completed ? "completed" : "incompleted"}`}>
      <div className="task-info">
        <p className="taskname" onClick={() => toggleComplete(task.id)}>
          {task.task}
        </p>
        <span className="date-added">{formattedDate}</span>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          className="doneCheckbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
