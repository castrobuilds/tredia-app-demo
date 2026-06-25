import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

import { useState } from "react";
import useTaskStore from "./store/useTaskStore";
import Board from "./components/Board";
import { findColumnOfTask, findIndexInColumn } from "./utils/utils";
import type { ColumnKey } from "./types/Task";
import TaskCard from "./components/TaskCard";
import { shallow } from "zustand/shallow";

export default function App() {
  const moveTask = useTaskStore((s) => s.moveTask);
  const columns = useTaskStore((s) => s.columns, shallow);

  // Drag States
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    setOverId(overId);

    const fromColumn = findColumnOfTask(activeId);
    if (!fromColumn) return;

    let toColumn: ColumnKey | null = null;
    let toIndex = -1;

    // 1. Hoverting a column
    if (overId in columns) {
      toColumn = overId as ColumnKey;
      toIndex = columns[toColumn].length; // insert at the end
    }

    // 2. Hovering a task
    else {
      toColumn = findColumnOfTask(overId);
      if (!toColumn) return;

      const overIndex = findIndexInColumn(toColumn, overId);

      const isBelow = event.delta.y > 0;

      toIndex = overIndex + (isBelow ? 1 : 0);
    }

    if (!toColumn) return;

    const fromIndex = findIndexInColumn(fromColumn, activeId);

    // Prevent useless updates
    if (fromColumn === toColumn && Math.abs(fromIndex - toIndex) === 0) return;

    moveTask(activeId, toColumn, toIndex);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={() => {
        setActiveId(null);
        setOverId(null);
      }}
    >
      <Board />

      {/* Floating Card */}
      <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
        {activeId ? <TaskCard id={activeId} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
