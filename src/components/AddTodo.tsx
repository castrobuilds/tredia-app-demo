import { useState } from "react";
import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";

export default function AddTodo({ column }: { column: ColumnKey }) {
  const [text, setText] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    addTask(column, newTask);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between p-2">
      <input
        className="flex-1 p-2 border rounded"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button
        type="submit"
        className="transition duration-200 ease-in-out transform hover:bg-blue-600 px-6 bg-blue-500 text-white rounded ml-2"
      >
        Add
      </button>
    </form>
  );
}
