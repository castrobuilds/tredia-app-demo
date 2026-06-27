import { create } from "zustand";

type UIState = {
  draggingTaskId: string | null;
  isDragging: boolean;

  setDraggingTask: (id: string | null) => void;
  setIsDragging: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  draggingTaskId: null,
  isDragging: false,

  setDraggingTask: (id) => set({ draggingTaskId: id }),

  setIsDragging: (value) => set({ isDragging: value }),
}));
