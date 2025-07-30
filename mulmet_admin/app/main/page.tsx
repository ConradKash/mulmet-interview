"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import SideBar from "@/components/layout/sideBar";

type Task = {
  id: string;
  title: string;
  description?: string;
  assignedTo?: string;
  status?: string;
};

type User = {
  id: string;
  email: string;
};

const AdminDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch tasks
      const tasksSnapshot = await getDocs(collection(db, "tasks"));
      const tasksData: Task[] = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      // Fetch users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData: User[] = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setTasks(tasksData);
      setUsers(usersData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="block h-screen">
      <SideBar />
      <div style={{ padding: 64, marginLeft: 240 }}>
        <h1>Admin Panel</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <section>
              <h2>Tasks</h2>
              <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description || "-"}</td>
                      <td>
                        {users.find((u) => u.id === task.assignedTo)?.email ||
                          "-"}
                      </td>
                      <td>{task.status || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section style={{ marginTop: 32 }}>
              <h2>Users</h2>
              <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
