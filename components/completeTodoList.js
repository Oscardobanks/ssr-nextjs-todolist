import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { deleteTodo } from "@/store/todoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const CompleteTodoList = ({ todos }) => {
  const dispatch = useDispatch();
  
  const handleDelete = async (id) => {
    try {
      dispatch(deleteTodo(id));
      toast.warning("Todo deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo.");
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex flex-col gap-3">
          {todos?.length != 0 && (
            <p className="sm:block hidden sm:text-center bg-red-300 font-bold text-lg ps-2 mb-2">
              High Priority
            </p>
          )}
          {todos?.map(
            (todo) =>
              todo.completed &&
              todo.priority === "High" && (
                <div
                  key={todo.id}
                  className="darkCard flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <Link href={`/${todo.id}`}>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {todo.title}
                      </h4>
                    </Link>
                    <p className="sm:hidden block text-md text-red-400 font-semibold">
                      High Priority
                    </p>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
          )}
        </div>

        <div className="flex flex-col gap-3">
          {todos?.length != 0 && (
            <p className="sm:block hidden sm:text-center bg-amber-200 font-bold text-lg ps-2 mb-2">
              Medium Priority
            </p>
          )}
          {todos?.map(
            (todo) =>
              todo.completed &&
              todo.priority === "Medium" && (
                <div
                  key={todo.id}
                  className="darkCard flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <Link href={`/${todo.id}`}>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {todo.title}
                      </h4>
                    </Link>
                    <p className="sm:hidden block text-md text-yellow-300 font-semibold">
                      Medium Priority
                    </p>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
          )}
        </div>

        <div className="flex flex-col gap-3">
          {todos?.length != 0 && (
            <p className="sm:block hidden sm:text-center bg-green-300 font-bold text-lg ps-2 mb-2">
              Low Priority
            </p>
          )}
          {todos?.map(
            (todo) =>
              todo.completed &&
              todo.priority === "Low" && (
                <div
                  key={todo.id}
                  className="darkCard flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <Link href={`/${todo.id}`}>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {todo.title}
                      </h4>
                    </Link>
                    <p className="sm:hidden block text-md text-green-400 font-semibold">
                      Low Priority
                    </p>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteTodoList;
