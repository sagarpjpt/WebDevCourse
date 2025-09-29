import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import {
  addItemTOServer,
  getItemsFromServer,
  deleteItemFromServer,
  markItemAsCompletedInServer,
} from "./services/itemsService";
import { useEffect, useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then((initialItems) => {
      setTodoItems(initialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const items = await addItemTOServer(itemName, itemDueDate);
    const newTodoItems = [...todoItems, items];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  const handleToggleComplete = async (id) => {
    try {
      const updatedItem = await markItemAsCompletedInServer(id);
      setTodoItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                completed: updatedItem.completed,
                name: updatedItem.task || item.name, // handle potential server response difference
                dueDate: updatedItem.date || item.dueDate, // handle potential server response difference
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <AppName />
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems
          todoItems={todoItems}
          onDeleteClick={handleDeleteItem}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
