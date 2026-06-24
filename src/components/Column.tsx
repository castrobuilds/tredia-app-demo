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

  // Get tasks & filter by date
  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.date === date);
  }, [tasks, date]);

  // Move task function from the store
  const moveTask = useTaskStore((state) => state.moveTask);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;

    // empty column → index = 0
    moveTask(taskId, date, filteredTasks.length);
  };

  return (
    <div
      className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-6 min-h-40"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <div className="my-4 h-px mx-auto w-3/4 border-t-0 bg-white" />
      <AddTodo date={date} />
      <AnimatePresence>
        <ul>
          {filteredTasks.map((task, index) => (
            <div key={task.id}>
              {/* Drop Zone */}
              <div
                className="h-2 hover:bg-blue-300 transition"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const taskId = e.dataTransfer.getData("taskId");
                  moveTask(taskId, date, index);
                }}
              />
              <TaskCard key={task.id} task={task} index={index} />
            </div>
          ))}
          {/* Drop Zone at the end of the column */}
          <div
            className="h-4 hover:bg-blue-300 transition"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const taskId = e.dataTransfer.getData("taskId");
              moveTask(taskId, date, filteredTasks.length);
            }}
          />
        </ul>
      </AnimatePresence>
    </div>
  );
}
