export type Task = {
  id: string;
  text: string;
  completed: boolean;
  dateCreated: Date;
};

export type TaskStore = {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  moveTask: (id: string, newIndex: number) => void;
};
