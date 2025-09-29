import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onToggleComplete }) => {
  // Separate items into pending and completed
  const pendingItems = todoItems.filter((item) => !item.completed);
  const completedItems = todoItems.filter((item) => item.completed);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 sm:space-y-12 px-4 sm:px-0">
      {/* Pending Tasks */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <span className="mr-2">📝</span>
          Active Tasks ({pendingItems.length})
        </h2>
        <div className="space-y-2 sm:space-y-3">
          {pendingItems.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todoDate={item.dueDate}
              todoName={item.name}
              completed={item.completed}
              onDeleteClick={onDeleteClick}
              onToggleComplete={onToggleComplete}
            />
          ))}
          {pendingItems.length === 0 && (
            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
              No active tasks. Great job! 🎉
            </p>
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="border-t pt-6 sm:pt-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-4 sm:mb-6 flex items-center">
          <span className="mr-2">✅</span>
          Completed Tasks ({completedItems.length})
        </h2>
        <div className="space-y-2 sm:space-y-3">
          {completedItems.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todoDate={item.dueDate}
              todoName={item.name}
              completed={item.completed}
              onDeleteClick={onDeleteClick}
              onToggleComplete={onToggleComplete}
            />
          ))}
          {completedItems.length === 0 && (
            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
              No completed tasks yet. Keep going! 💪
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItems;
