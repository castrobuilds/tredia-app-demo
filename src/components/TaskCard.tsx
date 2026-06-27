import useTaskStore from "../store/useTaskStore";
import { motion } from "framer-motion";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({
  id,
  overlay = false,
}: {
  id: string;
  overlay?: boolean;
}) {
  // Get task data
  const task = useTaskStore((state) => state.tasks[id]);
  if (!task) return null;

  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.deleteTask);

  // dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "task" },
    transition: { duration: 180, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
    animateLayoutChanges: (args) => {
      const { isSorting, isDragging } = args;

      if (isSorting || isDragging) {
        return defaultAnimateLayoutChanges(args);
      }

      return true;
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      variants={variants}
      initial="initial"
      animate="animate"
      className={`flex items-center p-2 bg-white rounded-md mb-2 cursor-grab active:cursor-grabbing ${isDragging ? "opacity-0" : ""} ${overlay ? "shadow-xl scale-105 rotate-1" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(id)}
        className="h-5 w-5"
      />
      <span
        className={`flex-1 ml-2 ${task.completed ? "line-through text-gray-500" : ""}`}
      >
        {task.text}
      </span>
      <div>
        <button
          onClick={() => removeTask(id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          x
        </button>
      </div>
    </motion.li>
  );
}
