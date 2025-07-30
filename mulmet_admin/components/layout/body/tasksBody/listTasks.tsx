import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Adjust the import path to your firebase config

type Task = {
  state: boolean;
  date: { seconds: number; nanoseconds: number }; // Firestore Timestamp
  description: string;
  owner: string;
  title: string;
};

function formatDate(timestamp: { seconds: number; nanoseconds: number }) {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hour12: false,
    timeZone: "Africa/Nairobi", // UTC+3
  });
}

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const fetchedTasks: Task[] = [];
        querySnapshot.forEach((doc) => {
          fetchedTasks.push(doc.data() as Task);
        });
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <>
      <div className="w-[70%] flex flex-col bg-gray-900 rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Tasks</h2>

        {tasks.map((task, idx) => (
          <li
            key={idx}
            className="py-4 px-4 flex flex-col  md:flex-row md:items-stretch md:justify-between bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow hover:shadow-lg transition-all duration-200"
          >
            {/* Name */}
            <div className="flex-1 flex flex-row items-center gap-6 text-gray-300 text-sm">
              <span className="font-semibold text-gray-400">Name:</span>{" "}
              <span className="text-gray-200">{task.title}</span>
            </div>

            {/* Status */}
            <div className="flex-1 flex flex-row items-center gap-6 text-gray-300 text-sm">
              <span className="font-semibold text-gray-400">Status:</span>{" "}
              <span className="text-gray-200">
                {task.state ? "Completed" : "Pending"}
              </span>
            </div>

            {/* Owner */}
            <div className="flex-1 flex flex-row items-center gap-4 text-gray-300 text-sm">
              <span className="font-semibold text-gray-400">Date:</span>{" "}
              <span className="text-gray-200">{formatDate(task.date)}</span>
            </div>
            {/* Ownner */}
            <div className="flex-1 flex flex-row items-center gap-6 text-gray-300 text-sm">
              <span className="font-semibold text-gray-400">Owner</span>{" "}
              <span className="text-gray-300">&quot;{task.owner}&quot;</span>
            </div>
            {/* Description */}
            <div className="flex-1 flex flex-row items-center gap-6 text-gray-300 text-sm">
              <span className="font-semibold text-gray-400">Description:</span>{" "}
              <span className="text-gray-300">
                &quot;{task.description}&quot;
              </span>
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default ListTasks;
