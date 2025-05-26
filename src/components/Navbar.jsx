// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase"; // Make sure this path is correct
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const user = auth.currentUser;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600";

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully");
      setIsPanelOpen(false);
      // optionally redirect to login or home page here if needed
      // navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      alert("Error signing out");
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FinBot<span className="text-gray-800">.AI</span>
        </Link>
        <div className="space-x-6 flex items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/planner" className={navLinkClass}>
            Planner
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          {!user && (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}

          {user && (
            <button
              onClick={togglePanel}
              className="ml-4 focus:outline-none"
              aria-label="User menu"
              title="User menu"
            >
              {/* Simple user icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-700 hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 1118.88 6.195a9 9 0 01-13.758 11.61z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>

      {/* Half-screen panel */}
      {isPanelOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={togglePanel}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          ></div>

          {/* Sliding panel */}
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-6 flex flex-col"
            style={{ minWidth: "20rem" }}
          >
            <button
              onClick={togglePanel}
              className="self-end mb-4 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close user panel"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <p className="mb-4">
              <strong>Email:</strong>{" "}
              <span className="break-all">{user?.email || "N/A"}</span>
            </p>

            <button
              onClick={handleSignOut}
              className="mt-auto py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </>
  );
}
