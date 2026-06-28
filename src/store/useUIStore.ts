import { create } from "zustand";

type UIState = {
  draggingTaskId: string | null;
  isDragging: boolean;

  setDraggingTask: (id: string | null) => void;
  setIsDragging: (value: boolean) => void;

  activeDrawer: DrawerType;
  openDrawer: (type: DrawerType) => void;
  closeDrawer: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  draggingTaskId: null,
  isDragging: false,

  setDraggingTask: (id) => set({ draggingTaskId: id }),

  setIsDragging: (value) => set({ isDragging: value }),

  activeDrawer: null,
  openDrawer: (type) => set({ activeDrawer: type }),
  closeDrawer: () => set({ activeDrawer: null }),
}));

type DrawerType = "yesterday" | "tomorrow" | null;
