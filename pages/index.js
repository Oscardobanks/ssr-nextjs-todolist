import { fetchTodos, getTodoData } from "@/store/todoSlice";
import { Button, Spinner, Tabs } from "flowbite-react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdChecklist } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import checkIcon from "../public/check-mark.png";
import { ModalComponent } from "@/components/Modal";
import TodoList from "@/components/todoList";
import CompleteTodoList from "@/components/completeTodoList";
import { wrapper } from "@/store/store";
import useModal from "@/customHook/CustomHook";

export default function Home() {
  const dispatch = useDispatch();
  const { todos, todo, status, error } = useSelector(getTodoData);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === "loading" && (
        <div className="lg:fixed relative lg:mt-0 mt-60 top-1/2 lg:left-1/2 flex justify-center gap-2">
          <Spinner color="purple" aria-label="Loading" size="md" />
          <span className="pl-3 text-purple-600 font-semibold text-lg">
            Loading...
          </span>
        </div>
      )}
      ;
      {status === "succeeded" && todos.length > 0 && (
        <div className="container max-w-4xl mt-16 px-4 mx-auto">
          <Image src={checkIcon} alt="Check Mark" width={100} priority />
          <div className="flex items-center justify-between my-5">
            <h1 className="text-3xl font-bold text-center">Todo List</h1>
            <Button onClick={openModal} color="purple">
              Add
            </Button>
            <ModalComponent
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              todo={todo}
              todos={todos}
            />
          </div>

          <Tabs aria-label="Tabs with underline" variant="underline">
            <Tabs.Item
              active
              title={`All tasks ${todos.length}`}
              icon={MdFormatListBulleted}
            >
              <div className="max-w-4xl mx-auto">
                <TodoList todos={todos} />
              </div>
            </Tabs.Item>
            <Tabs.Item
              title={`Completed ${
                todos.filter((todo) => todo.completed).length
              }`}
              icon={MdChecklist}
            >
              <CompleteTodoList todos={todos} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
      {status === "failed" && <p>Error: {error.message}</p>}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTodos());
    return {
      props: {},
    };
  }
);
