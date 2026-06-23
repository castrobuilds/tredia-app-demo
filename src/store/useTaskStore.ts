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

  moveTask: (id, newIndex) =>
    set((state) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return state; // Task not found

      const updatedTasks = [...state.tasks];
      const [movedTask] = updatedTasks.splice(taskIndex, 1);
      updatedTasks.splice(newIndex, 0, movedTask);

      return { tasks: updatedTasks };
    }),
}));

export default useTaskStore;
