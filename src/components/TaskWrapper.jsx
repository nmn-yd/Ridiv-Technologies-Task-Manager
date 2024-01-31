import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskForm } from "./TaskForm";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Task";
import { EditForm } from "./EditForm";

export const TaskWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // use to fetch entries from local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // add todo in List
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
        dateAdded: new Date().toLocaleString(),
      },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Mark todo done using below code
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // delete todo using below code
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const filterTasks = (type) => {
    setFilter(type);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTodos = todos.slice(); // Use todos.slice() to create a shallow copy
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodos(reorderedTodos);
    localStorage.setItem("todos", JSON.stringify(reorderedTodos));
  };

  // filtering of todos
  const filteredTodos =
    filter === "all"
      ? todos
      : todos.filter((todo) => todo.completed === (filter === "completed"));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="TodoWrapper"
          >
            <div className="todo-header">
              <div>
                <h1 className="todo-heading">Add Your Task </h1>
              </div>
              <TaskForm addTodo={addTodo} />
            </div>

            <div className="filter-buttons">
              <button onClick={() => filterTasks("all")}>All</button>
              <button onClick={() => filterTasks("completed")}>Done</button>
              <button onClick={() => filterTasks("incomplete")}>Left</button>
            </div>

            {filteredTodos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {todo.isEditing ? (
                      <EditForm editTodo={editTask} task={todo} key={todo.id} />
                    ) : (
                      <Task
                        task={todo}
                        key={todo.id}
                        index={index}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
