import { useUIStore } from "../store/useUIStore";
import TasksView from "./TasksView";

export default function SideDrawer() {
  const { activeDrawer, closeDrawer } = useUIStore();

  if (!activeDrawer) return null;

  const isLeft = activeDrawer === "yesterday";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/20 z-10"
      />

      {/* Drawer */}
      <div
        className={`
          absolute top-0 h-full w-120 bg-stone-50 z-20 shadow-xl
          transition-transform duration-300 ease-in-out
          ${isLeft ? "left-0" : "right-0"}
        `}
      >
        {activeDrawer === "yesterday" && <TasksView column="yesterday" />}
        {activeDrawer === "tomorrow" && <TasksView column="tomorrow" />}
      </div>
    </>
  );
}
