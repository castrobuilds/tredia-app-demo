import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
} from "@dnd-kit/core";

import useTaskStore from "./store/useTaskStore";
import Board from "./components/Board";
import { findColumnOfTask, findIndexInColumn } from "./utils/utils";
import type { ColumnKey } from "./types/Task";
import TaskCard from "./components/TaskCard";
import { shallow } from "zustand/shallow";
import { useUIStore } from "./store/useUIStore";

export default function App() {
  const moveTask = useTaskStore((s) => s.moveTask);
  const columns = useTaskStore((s) => s.columns, shallow);

  // Drag States
  const setDraggingTask = useUIStore((s) => s.setDraggingTask);
  const setIsDragging = useUIStore((s) => s.setIsDragging);
  const draggingTaskId = useUIStore((s) => s.draggingTaskId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;

    setDraggingTask(id);
    setIsDragging(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    setIsDragging(false);
    setDraggingTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const fromColumn = findColumnOfTask(activeId);
    if (!fromColumn) return;

    let toColumn: ColumnKey | null = null;
    let toIndex = -1;

    if (overId in columns) {
      toColumn = overId as ColumnKey;
      toIndex = columns[toColumn].length;
    } else {
      toColumn = findColumnOfTask(overId);
      if (!toColumn) return;

      const overIndex = findIndexInColumn(toColumn, overId);
      const isBelow = event.delta?.y > 0;

      toIndex = overIndex + (isBelow ? 1 : 0);
    }

    if (!toColumn) return;

    moveTask(activeId, toColumn, toIndex);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={undefined}
      onDragEnd={handleDragEnd}
    >
      <Board />

      {/* Floating Card */}
      <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
        {draggingTaskId ? <TaskCard id={draggingTaskId} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
