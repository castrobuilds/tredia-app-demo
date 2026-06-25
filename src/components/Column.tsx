import TaskCard from "./TaskCard";
import AddTodo from "./AddTodo";
import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Column({ column }: { column: ColumnKey }) {
  const taskIds = useTaskStore((s) => s.columns[column]);

  // Column Droppable logic
  const { setNodeRef } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-200 p-4 rounded-lg h-[80vh] flex flex-col"
    >
      <h2 className="text-center font-bold mb-2">{column}</h2>

      <AddTodo column={column} />

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <ul className="mt-3 flex-1 overflow-y-auto">
          {taskIds.map((id) => (
            <div key={id}>
              <TaskCard id={id} />
            </div>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}
