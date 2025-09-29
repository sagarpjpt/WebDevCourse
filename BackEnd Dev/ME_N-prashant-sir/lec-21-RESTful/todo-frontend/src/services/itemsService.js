export const addItemTOServer = async (task, date) => {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const getItemsFromServer = async () => {
  const response = await fetch("http://localhost:3000/api/todo");
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};

export const markItemAsCompletedInServer = async (id) => {
  try {
    console.log("Sending request to toggle completion for item:", id);
    const response = await fetch(
      `http://localhost:3000/api/todo/${id}/completed`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const item = await response.json();
    console.log("Server response:", item);
    const mappedItem = mapServerItemToLocalItem(item);
    console.log("Mapped item:", mappedItem);
    return mappedItem;
  } catch (error) {
    console.error("Error in markItemAsCompletedInServer:", error);
    throw error;
  }
};

export const deleteItemFromServer = async (id) => {
  const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "DELETE",
  });
  const item = await response.json();
  return item._id;
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed || false, // ensure completed is always a boolean
    updatedAt: serverItem.updatedAt,
    createdAt: serverItem.createdAt,
  };
};
