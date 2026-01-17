import React from 'react';
import { motion } from 'framer-motion';

const KineticText = ({ text, className }) => {
    return (
        <div className={`overflow-hidden flex flex-wrap gap-x-4 ${className}`}>
            {text.split(" ").map((word, i) => (
                <div key={i} className="overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

export default KineticText;
