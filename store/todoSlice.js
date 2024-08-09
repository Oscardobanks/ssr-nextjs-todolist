import {
    createSlice,
    createAsyncThunk,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  // Define the initial state
  const initialState = {
    todo: null,
    todos: [],
    status: "idle",
    error: null,
  };
  
  // Create a thunk for fetching todos
  export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await axios.get(
      "/api/todos"
    );
    return response.data;
  });
  
  export const fetchTodo = createAsyncThunk("todos/fetchTodo", async (id) => {
    const response = await axios.get(
      `/api/todos/${id}`
    );
    return response.data;
  });
  
  export const createTodo = createAsyncThunk("todos/createTodo", async (todo) => {
    const response = await axios.post("/api/todos", todo);
    return response.data;
  });
  
  export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
    const response = await axios.put(`/api/todos/${todo.id}`, todo);
    return response.data;
  });
  
  export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
    await axios.delete(`/api/todos/${id}`);
    return id;
  });
  
  // Create a slice for managing the todos
  const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
      resetTodo: (state) => {
        state.todo = null;
      },
      toggleTodoCompleted: (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload);
        if (index !== -1) {
          state.todos[index] = {
            ...state.todos[index],
            completed: !state.todos[index].completed,
          };
        }
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        // const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
        // if (todoIndex !== -1) {
        //   state.todos[todoIndex] = action.payload;
        // }
        state.todo = action.payload;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    },
  });
  
  // Export the actions and the reducer
  export const { resetTodo, toggleTodoCompleted } =
    todosSlice.actions;
  
  export const getTodoData = (state) => state.todos;
  
  export default todosSlice.reducer;