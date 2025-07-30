import React from "react";
import ListTasks from "./listTasks";
import CreateTasks from "./createTasks";

const TasksBody: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <ListTasks />
      <CreateTasks />
    </div>
  );
};

export default TasksBody;
