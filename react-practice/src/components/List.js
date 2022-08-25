import React, { useState } from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleClick = (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    };

    const handleCheck = (id) => {
      let changedTodo = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(changedTodo);
    };

    const handleEditChange = (e) => setEditedTitle(e.target.value);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
          data.completed = false;
        }
        return data;
      });
      setTodoData(newTodoData);
      setIsEditing(false);
    };

    const resetCompleted = () => {
      const newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = false;
        }
        return data;
      });
      setTodoData(newTodoData);
    };
    if (isEditing) {
      return (
        <div
          className={
            "bg-gray-400 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded"
          }>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                onChange={handleEditChange}
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(title);
                resetCompleted();
              }}>
              x
            </button>
            <button
              className="px-4 py-2 float-right"
              type="submit"
              onClick={handleSubmit}>
              save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
          <div>
            <input
              type="checkbox"
              className="m-1"
              defaultChecked={false}
              onChange={() => {
                handleCheck(id);
              }}
            />
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleClick(id)}>
              x
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(true)}>
              edit
            </button>
          </div>
        </div>
      );
    }
  },
);

export default List;
