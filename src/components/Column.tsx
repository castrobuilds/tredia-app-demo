import TaskCard from "./TaskCard";
import { AnimatePresence } from "framer-motion";
import AddTodo from "./AddTodo";
import { getToday, getTomorrow, getYesterday } from "../utils/dateUtils";
import useTaskStore from "../store/useTaskStore";
import { useMemo } from "react";

export default function Column({ title }: { title: string }) {
  let date: string;

  if (title === "Yesterday") {
    date = getYesterday();
  } else if (title === "Today") {
    date = getToday();
  } else if (title === "Tomorrow") {
    date = getTomorrow();
  } else {
    date = "";
  }

  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.date === date);
  }, [tasks, date]);

  return (
    <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <div className="my-4 h-px mx-auto w-3/4 border-t-0 bg-white" />
      <AddTodo date={date} />
      <AnimatePresence>
        <ul>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
}
