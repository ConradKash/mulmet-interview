import React from "react";
import Link from "next/link";
import { FaHome, FaUsers,  FaSignOutAlt, FaTasks } from "react-icons/fa";

const sidebarLinks = [
    { href: "/", label: "Dashboard", icon: <FaHome /> },
    { href: "/users", label: "Users", icon: <FaUsers /> },
    { href: "/settings", label: "Settings", icon: <FaTasks /> },
];

const SideBar: React.FC = () => {
    return (
        <aside className="w-60 h-screen bg-[#1A2236] text-white flex flex-col justify-between fixed left-0 top-0 shadow-lg z-[100]">
            <div>
                <div className="py-8 pl-8 pb-6 font-bold text-2xl tracking-wider text-[#FF6B6B]">
                    Mulmet Admin
                </div>
                <nav>
                    <ul className="list-none p-0 m-0">
                        {sidebarLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="flex items-center px-8 py-3 text-white no-underline font-medium text-base transition-colors duration-200 hover:bg-[#ff6b6b14]"
                                >
                                    <span className="mr-4 text-xl">
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="p-6">
                <button
                    className="w-full bg-[#FF6B6B] text-white border-none rounded-md py-3 font-semibold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 hover:bg-[#ff5252]"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
