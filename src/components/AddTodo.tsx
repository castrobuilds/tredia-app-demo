import { useState, type FormEvent } from "react";
import useTaskStore from "../store/useTaskStore";

export default function AddTodo({ date }: { date: string }) {
  const [text, setText] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, date);
      setText("");
    }
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
