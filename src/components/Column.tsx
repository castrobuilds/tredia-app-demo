import TaskCard from "./TaskCard";
import { AnimatePresence } from "framer-motion";
import AddTodo from "./AddTodo";
import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ column }: { column: ColumnKey }) {
  // Get task Ids
  const taskIds = useTaskStore((state) => state.columns[column]);

  // Make Column droppable
  const { setNodeRef } = useDroppable({ id: column });

  return (
    <div
      ref={setNodeRef}
      className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-6 min-h-40"
    >
      <h2 className="text-lg font-semibold text-center">{column}</h2>

      <AddTodo column={column} />

      <div className="flex-1 overflow-y-auto mt-3">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            <ul className="min-h-5">
              {taskIds.map((id) => (
                <TaskCard key={id} id={id} />
              ))}
            </ul>
          </AnimatePresence>
        </SortableContext>
      </div>
    </div>
  );
}
