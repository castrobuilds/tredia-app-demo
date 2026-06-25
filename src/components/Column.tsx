import TaskCard from "./TaskCard";
import AddTodo from "./AddTodo";
import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Column({
  column,
  activeId,
  overId,
}: {
  column: ColumnKey;
  activeId: string | null;
  overId: string | null;
}) {
  const taskIds = useTaskStore((s) => s.columns[column]);

  // Column Droppable logic
  const { setNodeRef } = useDroppable({
    id: column,
  });

  // Insertion index
  const getInsertIndex = () => {
    if (!overId) return null;

    // ig hovering a column → insert at the end
    if (overId === column) return taskIds.length;

    // hovering a task → insert before it
    const index = taskIds.indexOf(overId);

    return index === -1 ? taskIds.length : index;
  };

  const insertIndex = getInsertIndex();

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-200 p-4 rounded-lg h-[80vh] flex flex-col"
    >
      <h2 className="text-center font-bold mb-2">{column}</h2>

      <AddTodo column={column} />

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <ul className="mt-3 flex-1 overflow-y-auto">
          {taskIds.map((id, index) => (
            <div key={id}>
              {/* 🔥 insertion indicator */}
              {insertIndex === index && activeId && (
                <div className="h-1 bg-blue-500 rounded mb-2 transition-all" />
              )}

              <TaskCard id={id} />
            </div>
          ))}

          {/* 🔥 end-of-list indicator */}
          {insertIndex === taskIds.length && activeId && (
            <div className="h-1 bg-blue-500 rounded mt-2" />
          )}
        </ul>
      </SortableContext>
    </div>
  );
}
