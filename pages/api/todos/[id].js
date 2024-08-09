import { deleteTodoById, getTodoById, updateTodoById } from "@/data/todos";

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      const todo = getTodoById(id);
      if (!todo) {
        res.status(404).json({ error: "User Not Found" });
        return;
      }
      res.status(200).json(todo);
      break;
    case "PUT":
      const updatedTodo = updateTodoById(id, req.body);
      res.status(200).json(updatedTodo);
      break;
    case "DELETE":
      deleteTodoById(id);
      res.status(200).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ message: "Method not allowed" });
  }
}
