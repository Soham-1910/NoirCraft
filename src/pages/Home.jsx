import { useNavigate } from "react-router-dom";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Listen for resize to switch SVG layouts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const strokeTransition = {
    duration: 3.5,
    ease: "easeInOut",
    delay: 0.5
  };

  const textStyles = {
    fontFamily: "'Allura', cursive",
    fill: "transparent",
    stroke: "white",
    strokeWidth: "1px",
    strokeDasharray: 1000,
  };

  const fillStyles = {
    fontFamily: "'Allura', cursive",
    fill: "white",
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative w-full min-h-screen">
        <div className="absolute inset-0 bg-black/60"></div>

        <RevealOnScroll onLoad delay={100}>
          <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4 md:px-6">

            {/* SVG WRITING ANIMATION */}
            <div className="w-full max-w-[350px] sm:max-w-[600px] md:max-w-[900px]">
              <svg
                // Taller viewBox for mobile (300 height vs 200)
                viewBox={isMobile ? "0 0 1000 300" : "0 0 1000 200"}
                className="w-full h-auto overflow-visible"
              >
                {/* Desktop Version: Single Line */}
                {!isMobile ? (
                  <g>
                    <motion.text
                      x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                      className="text-[100px]"
                      style={textStyles}
                      initial={{ strokeDashoffset: 1000 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={strokeTransition}
                    >
                      Where Elegance Meets Darkness
                    </motion.text>
                    <motion.text
                      x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                      className="text-[100px] pointer-events-none"
                      style={fillStyles}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 2.5 }}
                    >
                      Where Elegance Meets Darkness
                    </motion.text>
                  </g>
                ) : (
                  /* Mobile Version: Two Lines */
                  <g>
                    {/* Line 1: Where Elegance */}
                    <motion.text
                      x="50%" y="35%" textAnchor="middle" dominantBaseline="middle"
                      className="text-[120px]"
                      style={textStyles}
                      initial={{ strokeDashoffset: 1000 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={strokeTransition}
                    >
                      Where Elegance
                    </motion.text>
                    <motion.text
                      x="50%" y="35%" textAnchor="middle" dominantBaseline="middle"
                      className="text-[120px] pointer-events-none"
                      style={fillStyles}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 2.5 }}
                    >
                      Where Elegance
                    </motion.text>

                    {/* Line 2: Meets Darkness */}
                    <motion.text
                      x="50%" y="65%" textAnchor="middle" dominantBaseline="middle"
                      className="text-[120px]"
                      style={textStyles}
                      initial={{ strokeDashoffset: 1000 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ ...strokeTransition, delay: 1.2 }} // Staggered start
                    >
                      Meets Darkness
                    </motion.text>
                    <motion.text
                      x="50%" y="65%" textAnchor="middle" dominantBaseline="middle"
                      className="text-[120px] pointer-events-none"
                      style={fillStyles}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 3.2 }}
                    >
                      Meets Darkness
                    </motion.text>
                  </g>
                )}
              </svg>
            </div>

            <p className="text-[10px] md:text-sm text-gray-400 mb-10 font-montserrat max-w-[280px] md:max-w-none tracking-[0.3em] md:tracking-[0.4em] uppercase leading-relaxed">
              Minimal luxury fashion crafted <br className="md:hidden" />
              for those who embrace the night
            </p>

            <button
              className="fancy-btn scale-90 md:scale-100"
              onClick={() => navigate("/category/clothing")}
            >
              <div className="top">Shop Now</div>
              <div className="bottom"></div>
            </button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

export default Home;