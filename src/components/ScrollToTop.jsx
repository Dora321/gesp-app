import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/useShouldRunDecorativeMotion';

export default function ScrollToTop() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled upto given distance
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[100] transition-all duration-300">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 active:scale-95 group"
                    aria-label="Back to Top"
                >
                    <ArrowUp size={24} className="group-hover:animate-bounce-short" />
                </button>
            )}
        </div>
    );
}
