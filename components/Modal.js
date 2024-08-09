import {
  createTodo,
  fetchTodo,
  fetchTodos,
  updateTodo,
} from "@/store/todoSlice";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ModalComponent({ isModalOpen, closeModal, todo, todos }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: todo ? todo.title : "",
    priority: todo ? todo.priority : "",
    completed: todo ? todo.completed : false,
  });
  if (!isModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name === "completed") {
      setFormData({ ...formData, completed: checked });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  function onCloseModal() {
    closeModal();
    setFormData({ title: "", priority: "", completed: false });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    try {
      const newTodo = {
        ...formData,
        id: todos.length + 1,
        created: new Date(),
      };
      dispatch(createTodo(newTodo));
      dispatch(fetchTodos());
      toast.success("Todo created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create todo.");
    }
    setFormData({ title: "", priority: "", completed: false });
  };

  const handleUpdate = async () => {
    closeModal();
    try {
      console.log(formData);
      const updatedTodo = { ...todo, ...formData };
      console.log(updatedTodo);
      dispatch(updateTodo(updatedTodo));
      dispatch(fetchTodo(todo.id));
      toast.info("Todo updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update todo.");
    }
  };

  return (
    <>
      <Modal show={isModalOpen} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <p className="sm:text-3xl text-xl font-bold mb-10">
              {todo ? "Update The Task" : "Add A Task"}
            </p>
            <form>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="text-black px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:border focus:border-purple-500"
                  placeholder="Add a new task..."
                />

                <div className="flex justify-between">
                  <p className="font-bold text-lg">Priority:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value="High"
                      id="high"
                      className="text-purple-500 focus:outline-purple-500"
                      checked={formData.priority === "High"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="high">High</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value="Medium"
                      id="medium"
                      className="text-purple-500 focus:outline-purple-500"
                      checked={formData.priority === "Medium"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="medium">Medium</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value="Low"
                      id="low"
                      className="text-purple-500 focus:outline-purple-500"
                      checked={formData.priority === "Low"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="low">Low</label>
                  </div>
                </div>
                {todo && (
                  <div>
                    <label class="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="completed"
                        class="rounded-sm text-green-500 focus:outline-green-300"
                        checked={formData.completed}
                        onChange={handleInputChange}
                      />
                      <span class="ml-3 font-semibold">Completed</span>
                    </label>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-fit"
                    color="purple"
                    onClick={todo ? handleUpdate : handleSubmit}
                  >
                    {todo ? "Update Task" : "Add Task"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
