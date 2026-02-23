import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FilterBar({ category, gender, setGender, sortBy, setSortBy }) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const showGenderFilter = category === "clothing";

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
  ];

  const genderOptions = [
    { label: "All Collections", value: "all" },
    { label: "Menswear", value: "men" },
    { label: "Womenswear", value: "women" },
  ];

  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label;
  const currentGenderLabel = genderOptions.find(o => o.value === gender)?.label;

  return (
    <div className="md:sticky md:top-32 space-y-10 flex flex-col justify-start z-30">

      {/* SELECTION (GENDER) DROPDOWN */}
      {showGenderFilter && (
        <div className="relative border-b border-white/10 pb-2 group">
          <label className="text-[9px] uppercase tracking-[0.3em] text-gray-600 block mb-1">
            Selection
          </label>
          <button
            onClick={() => {
              setIsGenderOpen(!isGenderOpen);
              setIsSortOpen(false);
            }}
            className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white py-1 focus:outline-none"
          >
            <span>{gender === "all" ? "Choose Category" : currentGenderLabel}</span>
            <motion.div animate={{ rotate: isGenderOpen ? 180 : 0 }}>
              <ChevronDown size={14} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isGenderOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                /* Key Fix: absolute positioning so it floats over cards */
                className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border border-white/10 z-50 flex flex-col p-4 mt-1 shadow-2xl"
              >
                {genderOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => {
                      setGender(g.value);
                      setIsGenderOpen(false);
                    }}
                    className={`text-left text-[10px] uppercase tracking-[0.2em] py-2 transition-colors ${gender === g.value ? "text-white" : "text-gray-500 hover:text-white"
                      }`}
                  >
                    {g.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* SORT BY DROPDOWN */}
      <div className="relative border-b border-white/10 pb-2 group">
        <label className="text-[9px] uppercase tracking-[0.3em] text-gray-600 block mb-1">
          Refine
        </label>
        <button
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsGenderOpen(false);
          }}
          className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white py-1 focus:outline-none"
        >
          <span>{sortBy === "default" ? "Sort By" : currentSortLabel}</span>
          <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
            <ChevronDown size={14} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isSortOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              /* Floating over content */
              className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border border-white/10 z-50 flex flex-col p-4 mt-1 shadow-2xl"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`text-left text-[10px] uppercase tracking-[0.2em] py-2 transition-colors ${sortBy === option.value ? "text-white" : "text-gray-500 hover:text-white"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
}

export default FilterBar;