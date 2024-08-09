import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Spinner } from "flowbite-react";
import { fetchTodo, fetchTodos, getTodoData, resetTodo } from "@/store/todoSlice";
import useModal from "@/customHook/CustomHook";
import { ModalComponent } from "@/components/Modal";

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
      <div className="lg:fixed relative lg:mt-0 mt-60 top-1/2 lg:left-1/2 flex justify-center gap-2">
        <Spinner color="purple" aria-label="Loading" size="md" />
        <span className="pl-3 text-purple-600 font-semibold text-lg">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="container px-4 mt-16 max-w-xl mx-auto">
      <h1 className="mt-12 text-3xl font-bold">Todo Detail</h1>

      <div className="max-w-xl mx-auto my-8">
        <div className="flex flex-col gap-4 items-center py-10 px-5 bg-white border border-gray-200 rounded-lg shadow-md">
          <p className={`text-lg w-full text-center text-white font-semibold ${todo?.priority == "High" ? "bg-red-600" : todo?.priority == "Medium" ? "bg-yellow-400" : "bg-green-600"}`}>{todo?.priority} priority</p>
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
          <p className="text-lg font-medium">Created on{" "}
            <span className="text-lg font-bold">
              {new Date(todo?.created).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span></p>
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

      <Link href="/" onClick={handleResetTodo}>
        <span className="font-semibold text-blue-500 hover:text-blue-700">
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default TodoDetail;
