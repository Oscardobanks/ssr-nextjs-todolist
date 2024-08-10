let todos = [
  {
    id: 1,
    title: "Do Laundry of dirty clothes",
    priority: "High",
    completed: false,
    created: new Date(),
  },
  {
    id: 2,
    title: "Go shopping for babies things",
    priority: "Medium",
    completed: true,
    created: new Date(),
  },
  {
    id: 3,
    title: "Clean the kitchen",
    priority: "High",
    completed: true,
    created: new Date(),
  },
  {
    id: 4,
    title: "Wash all the Plates",
    priority: "Low",
    completed: false,
    created: new Date(),
  },
];

export const getTodos = () => todos;

export const getTodoById = (id) => todos.find((todo) => todo.id === parseInt(id, 10));

export const addTodo = (todo) => {
  const newTodo = { ...todo, id: todos.length + 1, created: new Date };
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
