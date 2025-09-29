function TodoItem({
  id,
  todoName,
  todoDate,
  completed,
  onDeleteClick,
  onToggleComplete,
}) {
  const formattedDate = new Date(todoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
      p-4 mb-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 
      border border-gray-200"
    >
      {/* Left: Checkbox + Task Name */}
      <div className="flex items-center space-x-3 flex-1 mb-2 sm:mb-0">
        <button
          onClick={() => onToggleComplete(id)}
          className={`w-5 h-5 rounded border transition-all duration-300 flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
            ${
              completed
                ? "bg-purple-500 border-purple-500"
                : "border-gray-300 hover:border-purple-500"
            }`}
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <span
          className={`text-gray-800 text-base break-words ${
            completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todoName}
        </span>
      </div>

      {/* Right: Date + Delete Button */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-5">
        {/* Date with icon */}
        <div className="flex items-center space-x-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">{formattedDate}</span>
        </div>

        {/* Delete Button with Icon */}
        <button
          type="button"
          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-red-600 rounded-lg 
            hover:bg-red-50 transition-all duration-300 
            hover:shadow-md hover:shadow-red-600/20
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => onDeleteClick(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
