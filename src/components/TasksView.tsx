import { useDroppable } from "@dnd-kit/core";
import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";
import AddTodo from "./AddTodo";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function TasksView({ column }: { column: ColumnKey }) {
  const taskIds = useTaskStore((s) => s.columns[column]);

  // Column Droppable logic
  const { setNodeRef } = useDroppable({
    id: column,
  });
  return (
    <div className="h-full flex flex-col items-center pt-16" ref={setNodeRef}>
      <p className="text-sm text-neutral-500 mb-8">Focus on what matters.</p>

      <AddTodo column={column} />

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <ul className="mt-3 flex-1 overflow-y-auto space-y-2">
          {taskIds.map((id) => (
            <li key={id}>
              <TaskCard id={id} />
            </li>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}
