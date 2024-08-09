let todos = [
  {
    id: 1,
    title: "Do Laundry of babies things and everyone",
    priority: "High",
    completed: false,
    created: new Date(),
  },
  {
    id: 2,
    title: "babies things and everyone",
    priority: "Medium",
    completed: true,
    created: new Date(),
  },
  {
    id: 3,
    title: "Do Laundry of things everyone",
    priority: "High",
    completed: true,
    created: new Date(),
  },
  {
    id: 4,
    title: "Wash Plates",
    priority: "Low",
    completed: false,
    created: new Date(),
  },
];

export const getTodos = () => todos;

export const getTodoById = (id) => todos.find((todo) => todo.id === parseInt(id, 10));

export const addTodo = (todo) => {
  const newTodo = { ...todo, id: todo.length + 1 };
  todos.push(newTodo);
  return newTodo;
};

export const updateTodoById = (id, updatedFields) => {
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updatedFields };
    return todos[todoIndex];
  }
  return null;
};

export const deleteTodoById = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    return deletedTodo[0];
  }
  return null;
};
