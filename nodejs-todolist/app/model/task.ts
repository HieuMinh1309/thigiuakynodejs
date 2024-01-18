import fs from "fs";

interface Task {
  id: string;
  title: string;
  description: string;
}

const readAllTask = (): Task[] => {
  const buffer = fs.readFileSync("task.json");
  const taskString = buffer.toString();
  const taskJson: Task[] = JSON.parse(taskString);
  return taskJson;
};

const createTask = (id: string, title: string, description: string): Task => {
  const newTask: Task = {
    id,
    title,
    description,
  };
  let taskList: Task[] = readAllTask();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

const readDetailTask = (id: string): Task | undefined => {
  let taskList: Task[] = readAllTask();
  const task = taskList.find((task) => id === task.id);
  return task;
};

const updateTask = (id: string, title: string, description: string): Task | false => {
  let taskList: Task[] = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const oldTask = taskList[index];
    const newTask: Task = { ...oldTask, title, description };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};

const deleteTask = (id: string): Task | false => {
  let taskList: Task[] = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task = taskList[index];
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

export {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
};
