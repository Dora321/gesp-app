import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled upto given distance
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[100] transition-all duration-300">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-3 rounded-full bg-white/90 hover:bg-white text-brand-blue shadow-lg shadow-blue-500/20 backdrop-blur-md border border-white/20 transition-all hover:-translate-y-1 hover:scale-110 active:scale-95 group"
                    aria-label="Back to Top"
                >
                    <ArrowUp size={24} className="group-hover:animate-bounce-short" />
                </button>
            )}
        </div>
    );
}
