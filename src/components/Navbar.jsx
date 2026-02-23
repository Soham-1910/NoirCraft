import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { openCart } from "../redux/uiSlice";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const navItems = [
        { name: "Clothing", path: "/category/clothing" },
        { name: "Accessories", path: "/category/accessories" },
        { name: "Electronics", path: "/category/electronics" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[60] bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between text-white">

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 -ml-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Brand */}
                <Link
                    to="/"
                    className="group relative text-lg md:text-xl tracking-[0.25em] md:tracking-[0.35em] font-light transition"
                >
                    <span className="hover:text-gray-300 transition duration-300">NOIRCRAFT</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-widest text-gray-400">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `group relative pb-1 transition duration-300 ${isActive ? "text-white" : "hover:text-white"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.name}
                                        {/* The Underline: Animates on hover OR stays full if active */}
                                        <span
                                            className={`absolute left-0 bottom-0 h-[1px] bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                                }`}
                                        ></span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Icons */}
                <div className="flex items-center gap-3 md:gap-6">
                    <button
                        onClick={() => dispatch(openCart())}
                        className="relative hover:text-gray-300 transition p-2"
                        aria-label="Open cart"
                    >
                        <ShoppingCart size={18} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    key={cartCount}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute top-0 right-0 min-w-[16px] h-[16px] px-1 text-[9px] rounded-full bg-white text-black flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-black border-b border-white/10 overflow-hidden"
                    >
                        <ul className="flex flex-col p-6 gap-4 text-[12px] uppercase tracking-[0.2em] text-gray-400">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `group relative inline-block py-2 transition duration-300 ${isActive ? "text-white" : "hover:text-white"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {item.name}
                                                <span
                                                    className={`absolute left-0 bottom-1 h-[1px] bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                                        }`}
                                                ></span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;