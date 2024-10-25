export type TaskAPI = {
  title: string;
  desc: string;
  completed: boolean;
};

export type TaskCollectionResponse = {
  id: TaskAPI;
};