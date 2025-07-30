import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // Adjust the import path as necessary

type User = {
  id: string;
  email: string;
};

const UsersBody: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCol = collection(db, "users");
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email || "", // Ensure email is always present
            ...data,
          };
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="w-200 bg-gray-900 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Users</h2>
      <ul className="divide-y divide-gray-700">
        {users.map((user) => (
          <li
            key={user.id}
            className="py-4 px-4 flex items-center justify-between bg-gradient-to-r to-gray-800 rounded-lg mb-3 shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {user.email ? user.email.charAt(0).toUpperCase() : user.id.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-100 font-medium text-lg">{user.email || user.id}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersBody;
