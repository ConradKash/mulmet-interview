import React from "react";
import ListTasks from "./listTasks";
import CreateTasks from "./createTasks";

const TasksBody: React.FC = () => {
  return (
    <>
      <ListTasks />
      <CreateTasks />
    </>
  );
};

export default TasksBody;
