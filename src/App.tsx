import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import useTaskStore from "./store/useTaskStore";
import Board from "./components/Board";
import { findColumnOfTask, findIndexInColumn } from "./utils/utils";
import type { ColumnKey } from "./types/Task";

export default function App() {
  const moveTask = useTaskStore((s) => s.moveTask);
  const columns = useTaskStore((s) => s.columns);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source column
    const fromColumn = findColumnOfTask(activeId);
    if (!fromColumn) return;

    let toColumn: ColumnKey | null = null;
    let toIndex = 0;

    if (overId in columns) {
      toColumn = overId as ColumnKey;
      toIndex = columns[toColumn].length;
    }
    // Drop on a task
    else {
      toColumn = findColumnOfTask(overId);
      if (!toColumn) return;

      toIndex = findIndexInColumn(toColumn, overId);
    }

    if (!toColumn) return;

    //prevent useless updates
    const fromIndex = findIndexInColumn(fromColumn, activeId);
    if (fromColumn === toColumn && fromIndex === toIndex) return;

    moveTask(activeId, toColumn, toIndex);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Board />
    </DndContext>
  );
}
