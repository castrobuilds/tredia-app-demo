import TaskCard from "./TaskCard";
import useTaskStore from "../hooks/useTaskStore";
import { AnimatePresence } from "framer-motion";
import AddTodo from "./AddTodo";

interface ColumnProps {
  title: string;
}

export default function Column({ title }: ColumnProps) {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <div className="my-4 h-px mx-auto w-3/4 border-t-0 bg-white" />
      <AddTodo />
      <AnimatePresence>
        <ul>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}

{
  /* <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-3">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <div className="mx-auto w-3/4">
        <div className="my-3 h-px mx-auto w-full border-t-0 bg-neutral-500" />
        <div className="flex flex-col gap-3">
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
        <div className="my-3 mx-auto w-full bg-slate-100 rounded-lg shadow-lg p-3">
          <form action="/submit" method="post">
            <div className="flex items-center gap-3">
              <input
                type="text"
                id="new-task"
                name="task"
                placeholder="Add a new task"
                className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-auto bg-blue-500 text-white px-2 rounded"
              >
                +
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> */
}
