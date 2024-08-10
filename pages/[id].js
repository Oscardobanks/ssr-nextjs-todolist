import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Spinner } from "flowbite-react";
import {
  fetchTodo,
  fetchTodos,
  getTodoData,
  resetTodo,
} from "@/store/todoSlice";
import useModal from "@/customHook/CustomHook";
import { ModalComponent } from "@/components/Modal";
import { FaArrowLeftLong } from "react-icons/fa6";

const TodoDetail = () => {
  const pathname = usePathname();
  const todoId = pathname?.split("/").pop();
  const dispatch = useDispatch();
  const { todos, todo, status } = useSelector(getTodoData);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchTodo(todoId));
  }, [todoId, dispatch]);

  const handleResetTodo = () => {
    dispatch(resetTodo());
    dispatch(fetchTodos());
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen pb-40  lg:fixed relative lg:mt-0 mt-60 top-1/2 lg:left-1/2 flex justify-center gap-2">
        <Spinner color="purple" aria-label="Loading" size="md" />
        <span className="pl-3 text-purple-600 font-semibold text-lg">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="bodyContainer bg-white max-w-5xl min-h-screen pt-10 md:px-16 px-10 mx-auto shadow-lg">
      <Link href="/" onClick={handleResetTodo}>
        <button className="darkCard flex gap-2 items-center px-3 py-1 font-semibold bg-white hover:bg-gray-50 border border-gray-200 shadow-lg rounded">
          <FaArrowLeftLong />
          <h6>Back Home</h6>
        </button>
      </Link>

      <h1 className="text-5xl font-bold text-center pt-8">
        Todo <span className="text-purple-600">Detail</span>
      </h1>

      <div className="max-w-xl mx-auto my-8">
        <div className="darkCard flex flex-col gap-4 items-center text-center py-10 px-5 bg-white border border-gray-200 rounded-lg shadow-md">
          <p
            className={`text-lg w-full text-center text-white font-semibold ${
              todo?.priority == "High"
                ? "bg-red-600"
                : todo?.priority == "Medium"
                ? "bg-yellow-400"
                : "bg-green-600"
            }`}
          >
            {todo?.priority} priority
          </p>
          <p className="text-2xl text-center font-bold">{todo?.title}</p>
          <p
            className={`text-lg font-semibold ${
              todo?.completed == true ? "text-green-500" : "text-red-500"
            }`}
          >
            {todo?.completed == true
              ? "Task Completed"
              : "Task has not been completed"}
          </p>
          <p className="text-lg font-medium">
            Created on{" "}
            <span className="text-lg font-bold">
              {new Date(todo?.created).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
          <Button onClick={openModal} color="purple">
            Update Task
          </Button>
          <ModalComponent
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            todo={todo}
            todos={todos}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
