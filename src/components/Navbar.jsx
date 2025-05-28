import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Make sure this path is correct
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // User menu dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Hamburger menu
  const navigate = useNavigate();

  const user = auth.currentUser;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close user dropdown on mobile menu toggle to avoid overlap
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully");
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Sign out error:", error);
      alert("Error signing out");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        FinBot<span className="text-gray-800">.AI</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <NavLink to="/home" className={navLinkClass}>
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

        {user && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="ml-4 flex items-center focus:outline-none text-gray-700 hover:text-blue-600"
              aria-label="User menu"
              title="User menu"
            >
              <span className="mr-2 truncate max-w-[150px]">{user.email}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isMobileMenuOpen ? (
            // X icon when open
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            // Hamburger icon when closed
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md md:hidden z-40">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                (isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600") + " block"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/planner"
              className={({ isActive }) =>
                (isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600") + " block"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planner
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                (isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600") + " block"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                (isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600") + " block"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                (isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600") + " block"
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <div className="border-t pt-4">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-red-600 hover:bg-red-100 px-4 py-2 rounded"
                  >
                    Logout ({user.email})
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
