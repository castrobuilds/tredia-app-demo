import useTaskStore from "../store/useTaskStore";
import type { ColumnKey } from "../types/Task";

// ✅ Find which column contains a task ID
export const findColumnOfTask = (taskId: string): ColumnKey | null => {
  const { columns } = useTaskStore.getState();

  for (const key of Object.keys(columns) as ColumnKey[]) {
    if (columns[key].includes(taskId)) {
      return key;
    }
  }

  return null; // safer than throwing
};

// ✅ Find index of task ID inside a column
export const findIndexInColumn = (
  column: ColumnKey,
  taskId: string,
): number => {
  const { columns } = useTaskStore.getState();

  return columns[column].indexOf(taskId);
};
