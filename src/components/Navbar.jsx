// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        FinBot<span className="text-gray-800">.AI</span>
      </Link>
      <div className="space-x-6">
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
        <NavLink to="/login" className={navLinkClass}>
          Login
        </NavLink>
        
      </div>
    </nav>
  );
}
