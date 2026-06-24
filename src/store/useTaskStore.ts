import { create } from "zustand";
import { type TaskStore } from "../types/Task";

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (text, date) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          text,
          completed: false,
          id: Date.now().toString(),
          date,
        },
      ],
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    })),

  moveTask: (id, newDate, newIndex) =>
    set((state) => {
      const tasks = [...state.tasks];

      // Remove Task from old position
      const oldIndex = tasks.findIndex((task) => task.id === id);
      if (oldIndex === -1) return state; // Task not found

      const [task] = tasks.splice(oldIndex, 1);

      const fromDate = task.date;

      // Update Date
      const updatedTask = { ...task, date: newDate };

      // get tasks of target column
      const columnTasks = tasks.filter((task) => task.date === newDate);

      // Adjust index if same column
      if (fromDate === newDate) {
        const oldColumnIndex = state.tasks
          .filter((task) => task.date === newDate)
          .findIndex((task) => task.id === id);

        if (oldColumnIndex < newIndex) {
          newIndex--;
        }
      }

      // Clamp newIndex to valid range
      newIndex = Math.max(0, Math.min(newIndex, columnTasks.length));

      // Insert Task at new position
      columnTasks.splice(newIndex, 0, updatedTask);

      // merge back
      const otherTasks = tasks.filter((task) => task.date !== newDate);

      return { tasks: [...otherTasks, ...columnTasks] };
    }),
}));

export default useTaskStore;
