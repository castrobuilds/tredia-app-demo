export type Task = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
};

export type TaskStore = {
  tasks: Task[];
  addTask: (text: string, date: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  moveTask: (id: string, newDate: string, newIndex: number) => void;
};
