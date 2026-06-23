import { type Task } from "../../types/Task";

export const selectTasksByDate = (date: string) => (state: { tasks: Task[] }) =>
  state.tasks.filter((task) => task.date === date);
