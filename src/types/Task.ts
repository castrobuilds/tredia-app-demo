export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type ColumnKey = "yesterday" | "today" | "tomorrow";

export type TaskStore = {
  tasks: Record<string, Task>;
  columns: Record<ColumnKey, string[]>;
  _hasHydrated: boolean;

  // actions
  setHasHydrated: (state: boolean) => void;
  addTask: (column: ColumnKey, task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  moveTask: (id: string, toColumn: ColumnKey, toIndex: number) => void;
};
