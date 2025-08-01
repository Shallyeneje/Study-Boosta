"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  activeRoute: string;
}

const NavBar = ({ activeRoute }: NavbarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const { token, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-[#F1F5FF] ">
      <div className="container mx-auto px-6 flex items-center justify-between py-4 ">
        {/* Navbar Brand */}
        <p className="text-left text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold text-[#050C9C]">
          StudyBoosta
        </p>

        {/* Desktop Menu */}
        <ul className="md:hidden hidden lg:flex gap-6">
          {[
            { name: "Home", href: "/" },
            { name: "Courses", href: "/courses" },
            { name: "Studybot", href: "/comingSoon" },
            { name: "Opportunities", href: "/opportunities" },
            { name: "Career Path", href: "/careerpath" },
            { name: "Digital Skills", href: "/digitalskills" },
            { name: "Mentorship", href: "/marketplace" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? "border-b-4 rounded border-[#050C9C] mt-2 font-semibold"
                    : "text-black"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="block md:block lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#050C9C]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Login & Signup */}
        <div className="space-x-4 md:hidden hidden lg:flex items-center">
          {token ? (
            <>
              <button
                onClick={handleLogout}
                className="text-[14px] font-bold text-[#D9534F] hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[14px] font-bold text-[#050C9C] hover:underline"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 font-semibold bg-[#050C9C] text-white rounded-xl hover:bg-blue-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (Visible when isOpen is true) */}
      {isOpen && (
        <div className="block md:block px-6 w-full lg:hidden bg-[#F1F5FF] ">
          <ul className="flex  flex-col gap-4">
            {[
              { name: "Home", href: "/" },
              { name: "Courses", href: "/courses" },
              { name: "Studybot", href: "/comingSoon" },
              { name: "Opportunities", href: "/opportunities" },
              { name: "Career Path", href: "/careerpath" },
              { name: "Digital Skills", href: "/digitalskills" },
              { name: "Mentorship", href: "/marketplace" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "font-semibold text-blue-700"
                      : "text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-x-14 py-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-[14px] font-bold text-[#D9534F] hover:underline"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[14px] font-bold text-[#050C9C] hover:underline"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 font-semibold bg-[#050C9C] text-white rounded-xl hover:bg-blue-800"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
