import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Adjust the import path to your firebase config

interface Task {
  title: string;
  description: string;
  date: string;
  owner: string;
  State: boolean;
}

const CreateTasks: React.FC = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    date: "",
    owner: "",
    State: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addDoc(collection(db, "tasks"), {
        ...task,
        date: task.date ? new Date(task.date) : serverTimestamp(),
      });
      setSuccess(true);
      setTask({
        title: "",
        description: "",
        date: "",
        owner: "",
        State: true,
      });
    } catch {
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mt-8 w-[25%] mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Create Task
      </h2>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
          Title
        </label>
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
          Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
          Due Date
        </label>
        <input
          type="datetime-local"
          name="date"
          value={task.date}
          onChange={handleChange}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
          Owner
        </label>
        <input
          name="owner"
          value={task.owner}
          onChange={handleChange}
          required
          disabled={loading}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center">
        <label className="text-gray-700 dark:text-gray-200 font-medium mr-2">
          State
        </label>
        <input
          type="checkbox"
          name="State"
          checked={task.State}
          onChange={handleChange}
          disabled={loading}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition-colors duration-200 disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
      {error && (
        <div className="text-red-600 dark:text-red-400 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 dark:text-green-400 text-center">
          Task created successfully!
        </div>
      )}
    </form>
  );
};

export default CreateTasks;
