import useTaskStore from "../store/useTaskStore";
import { motion } from "framer-motion";
import { type Task } from "../types/Task";

export default function TaskCard({ task }: { task: Task }) {
  const removeTask = useTaskStore((state) => state.deleteTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.li
      variants={variants}
      initial="initial"
      animate="animate"
      className="flex items-center p-2"
      layout
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-5 w-5"
      />
      <span
        className={`flex-1 ml-2 ${task.completed ? "line-through text-gray-500" : ""}`}
      >
        {task.text}
      </span>
      <button
        onClick={() => removeTask(task.id)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        x
      </button>
    </motion.li>
  );
}

{
  /*
    <div className="w-full mx-auto bg-slate-100 rounded-lg shadow-lg p-3">
      <form action="/submit" method="post">
        <div className="flex items-center gap-3">
          <input type="checkbox" id="todo" name="task" value="false" checked />
          <label htmlFor="todo">Task</label>
          <button
            type="button"
            className="ml-auto bg-red-500 text-white px-2 rounded"
          >
            x
          </button>
        </div>
      </form>
    </div>
    */
}
