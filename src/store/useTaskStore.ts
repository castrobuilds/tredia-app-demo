import { create } from "zustand";
import { type ColumnKey, type TaskStore } from "../types/Task";

const useTaskStore = create<TaskStore>((set) => ({
  tasks: {},

  columns: {
    yesterday: [],
    today: [],
    tomorrow: [],
  },

  // ✅ ADD TASK
  addTask: (column, task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [task.id]: task,
      },
      columns: {
        ...state.columns,
        [column]: [...state.columns[column], task.id],
      },
    })),

  // ✅ DELETE TASK
  deleteTask: (id) =>
    set((state) => {
      const columns = Object.fromEntries(
        Object.entries(state.columns).map(([key, ids]) => [
          key,
          ids.filter((taskId) => taskId !== id),
        ]),
      ) as TaskStore["columns"];

      const tasks = { ...state.tasks };
      delete tasks[id];

      return { columns, tasks };
    }),

  // ✅ TOGGLE TASK (ONLY TOUCH tasks)
  toggleTask: (id) =>
    set((state) => {
      const task = state.tasks[id];
      if (!task) return state;

      return {
        tasks: {
          ...state.tasks,
          [id]: {
            ...task,
            completed: !task.completed,
          },
        },
      };
    }),

  // ✅ MOVE TASK (PURE ID-BASED)
  moveTask: (id, toColumn, toIndex) =>
    set((state) => {
      const columns = {
        yesterday: [...state.columns.yesterday],
        today: [...state.columns.today],
        tomorrow: [...state.columns.tomorrow],
      };

      // 🛑 guard invalid column
      if (!columns[toColumn]) {
        console.error("Invalid column:", toColumn);
        return state;
      }

      let fromColumn: ColumnKey | null = null;
      let fromIndex = -1;

      // 🔍 find + remove
      for (const key of Object.keys(columns) as ColumnKey[]) {
        const index = columns[key].indexOf(id);

        if (index !== -1) {
          fromColumn = key;
          fromIndex = index;
          columns[key].splice(index, 1);
          break;
        }
      }

      if (!fromColumn) return state;

      const target = columns[toColumn];

      // 🧠 fix same-column downward shift
      let insertIndex = toIndex;
      if (fromColumn === toColumn && fromIndex < toIndex) {
        insertIndex -= 1;
      }

      // 🧱 clamp
      insertIndex = Math.max(0, Math.min(insertIndex, target.length));

      target.splice(insertIndex, 0, id);

      return { columns };
    }),
}));

export default useTaskStore;
