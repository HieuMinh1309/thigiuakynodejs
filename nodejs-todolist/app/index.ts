import yargs from "yargs";
import clc from "cli-color";
import {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
} from "./model/task";

// Create command for testing
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// CRUD commands

// Create task
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log(clc.green("Task created successfully:"), newTask);
  },
});

// Read all tasks
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(clc.blue("Tasks:"), result);
  },
});

// Read task details
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log("Task:", task);
    } else {
      console.log(clc.red("Task not found"));
    }
  },
});

// Update task
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log(clc.green("Task updated:"), task);
    } else {
      console.log(clc.red("Task not found"));
    }
  },
});

// Delete task
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log(clc.yellow("Task deleted:"), task);
    } else {
      console.log(clc.red("Task not found"));
    }
  },
});

yargs.parse();
