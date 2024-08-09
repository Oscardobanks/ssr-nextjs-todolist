import { getTodos, addTodo } from "@/data/todos";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const todos = getTodos();
        res.status(200).json(todos);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
      break;
    case "POST":
      try {
        const { title, priority } = req.body;
        if (!title || !priority) {
          res.status().json({ error: "Title and priority are required" });
          return;
        }
        const todo = addTodo({ title, priority });
        res.status(201).json(todo);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
