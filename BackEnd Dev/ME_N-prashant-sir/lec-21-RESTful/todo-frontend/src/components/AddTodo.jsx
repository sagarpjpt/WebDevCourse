import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState();
  const [dueDate, setDueDate] = useState();

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Task Input - Full width on mobile */}
        <div className="w-full sm:flex-1">
          <input
            type="text"
            placeholder="✍️ What needs to be done?"
            value={todoName}
            onChange={handleNameChange}
            className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-300
              placeholder:text-gray-400"
          />
        </div>
        {/* Date Input - Full width on mobile */}
        <div className="w-full sm:flex-1">
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all duration-300"
          />
        </div>
        {/* Button - Full width on mobile */}
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg
            font-medium shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40
            transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2
            focus:ring-purple-600 focus:ring-offset-2 active:scale-[0.98]"
          onClick={handleAddButtonClicked}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
