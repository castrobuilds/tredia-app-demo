import { useState } from "react";
import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";

export default function AddTodo({ column }: { column: ColumnKey }) {
  const [text, setText] = useState("");
  const addTask = useTaskStore((state) => state.addTask);
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
      setFocused(false);
    }

    if (e.key === "Backspace" && text === "") {
      setFocused(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-white border-2 min-w-md border-stone-300 rounded-xl transition ${focused ? "bg-stone-200 shadow-sm" : "hover:bg-stone-200"}`}
    >
      <div className="w-4 h-4 border rounded-full opacity-40" />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => !text && setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="What’s on your mind?"
        className="flex-1 bg-transparent outline-none text-sm"
      />
    </div>
  );
}
/*     <form
      onSubmit={handleSubmit}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-200 transition-colors"
    >
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
    </form> */
