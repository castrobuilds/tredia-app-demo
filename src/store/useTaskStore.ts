import { createWithEqualityFn } from "zustand/traditional";
import { persist, createJSONStorage } from "zustand/middleware";
import { type ColumnKey, type TaskStore } from "../types/Task";
import { createDebouncedJSONStorage } from "./debouncedStorage";
import { getToday } from "../utils/dateUtils";

const useTaskStore = createWithEqualityFn<TaskStore>()(
  persist(
    (set, get) => ({
      // Initial State
      tasks: {},
      columns: {
        yesterday: [],
        today: [],
        tomorrow: [],
      },

      _hasHydrated: false,
      lastUpdatedDay: getToday(),

      // ACTIONS
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

      // ADD TASK
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

      // DELETE TASK
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

      // TOGGLE TASK
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

      // MOVE TASK
      moveTask: (id, toColumn, toIndex) =>
        set((state) => {
          const columns = {
            yesterday: [...state.columns.yesterday],
            today: [...state.columns.today],
            tomorrow: [...state.columns.tomorrow],
          };

          // guard invalid column
          if (!columns[toColumn]) {
            console.error("Invalid column:", toColumn);
            return state;
          }

          let fromColumn: ColumnKey | null = null;
          let fromIndex = -1;

          //  find and remove
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

          // fix same-column downward shift
          let insertIndex = toIndex;
          if (fromColumn === toColumn && fromIndex < toIndex) {
            insertIndex -= 1;
          }

          // clamp
          insertIndex = Math.max(0, Math.min(insertIndex, target.length));

          target.splice(insertIndex, 0, id);

          return { columns };
        }),

      // SHIFT DAY
      shiftDay: () => {
        const today = getToday();

        const { lastUpdatedDay, columns } = get();

        if (lastUpdatedDay === today) return;

        //SHIFT
        set({
          columns: {
            yesterday: columns.today,
            today: columns.tomorrow,
            tomorrow: [],
          },
          lastUpdatedDay: today,
        });
      },
    }),

    // Persist Configuration
    {
      name: "task-storage-v1",

      storage: createJSONStorage(() => createDebouncedJSONStorage(300)),

      partialize: (state) => ({
        tasks: state.tasks,
        columns: state.columns,
        lastUpdatedDay: state.lastUpdatedDay,
      }),

      version: 1,

      migrate: (persistedState: any, version) => {
        if (version === 0) {
          // Migration logic from version 0 to version 1
          return {
            ...persistedState,
            columns: persistedState.columns ?? {
              yesterday: [],
              today: [],
              tomorrow: [],
            },
          };
        }
        return persistedState;
      },

      onRehydrateStorage: () => (state, error) => {
        state?.shiftDay();
        if (error) {
          console.error("Error during rehydration:", error);
        } else {
          state?.setHasHydrated(true);
        }
      },
    },
  ),
);

export default useTaskStore;
