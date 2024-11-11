export type TaskAPI = {
  title: string;
  desc: string;
  completed: boolean;
};

export type TaskCollectionResponse = {
  id: TaskAPI;
};

export type TaskCreationResponse = {
  name: string;
};

export type TaskId = string | number;
