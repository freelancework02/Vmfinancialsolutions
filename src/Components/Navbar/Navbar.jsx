import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/Logo/logo.png";
// import Logo from "../../assets/Logo/Plane-Future-logo.jpg"
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Products", path: "/product" },
    { name: "Partnership", path: "/partnership" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
  ];

  return (
    <header className="w-full bg-[#011634] text-[#ffffff] shadow-lg py-4 px-2 fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center h-[80px] logosection">
          <img
            src={Logo}
            alt="Logo"
            className="h-16  w-auto sm:scale-105 md:scale-105  lg:scale-100 "
            id="logo"
          />
          {/* <h1>We Plane Future</h1>
          <span></span> */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex text-2lg font-semibold justify-between">
          <div className="flex space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-2 py-2 text-[17px] transition duration-300 whitespace-nowrap ${location.pathname === item.path
                  ? "border-[#fff] border-b-2 text-[#fff]"
                  : "hover:border-b-2 hover:border-[#fff]"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-white focus:outline-none"
        >
          <AiOutlineMenu className="text-4xl" />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-white text-black shadow-lg flex flex-col items-start pt-12 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6"
        >
          <AiOutlineClose className="text-3xl text-black" />
        </button>

        {/* Mobile Menu Links */}
        <div className="flex flex-col w-full text-left space-y-2 mt-4 px-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full py-3 text-[16px] border-b transition duration-300 px-4 ${location.pathname === item.path
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-500 hover:text-white"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
