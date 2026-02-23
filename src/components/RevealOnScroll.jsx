import { useEffect, useRef, useState } from "react";

export const RevealOnScroll = ({ children, once = false, onLoad = false, delay = 0 }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (onLoad) {
            const timer = setTimeout(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                    setInitialized(true);
                });
            }, delay);
            return () => clearTimeout(timer);
        }

        const node = ref.current;
        if (!node) return;

        requestAnimationFrame(() => setInitialized(true));

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (once && node) observer.unobserve(node);
                } else {
                    if (!once) setVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [once, onLoad, delay]);

    const baseClasses = "transition-all duration-700 ease-out";
    const stateClasses = visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-0"; // keep space reserved for full-height sections

    return (
        <div
            ref={ref}
            className={`${baseClasses} ${stateClasses}`}
            style={{ willChange: "opacity, transform", minHeight: "50px" }}
        >
            {children}
        </div>
    );
};
