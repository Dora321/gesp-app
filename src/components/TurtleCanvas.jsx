import React, { useRef, useEffect, useState } from 'react';

const TurtleCanvas = ({ commands = [], width = 400, height = 300, isRunning = false }) => {
    const canvasRef = useRef(null);
    const isMounted = useRef(true);
    const [logoState, setLogoState] = useState({ x: width / 2, y: height / 2, angle: 0 });

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    const executeCommands = async (ctx) => {
        // Reset state
        let x = width / 2;
        let y = height / 2;
        let angle = -90; // Pointing up (0 is right in canvas)
        let isDown = true;
        let color = 'black';
        let fillColor = 'transparent';
        let isFilling = false;
        let fillPath = [];

        ctx.clearRect(0, 0, width, height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.fillStyle = fillColor;

        let currentSpeed = 20;

        const sleep = (ms) => new Promise(r => setTimeout(r, ms));

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (const cmdStr of commands) {
            if (!isMounted.current) return;

            // Very basic parser
            const parts = cmdStr.trim().split(' ');
            const cmd = parts[0].toLowerCase();
            const val = parts.length > 1 ? parts[1] : null;

            if (cmd === 'reset' || cmd === 'clear') {
                ctx.clearRect(0, 0, width, height);
                x = width / 2;
                y = height / 2;
                angle = -90;
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else if (cmd === 'fd' || cmd === 'forward') {
                const dist = parseFloat(val);
                const rad = (angle * Math.PI) / 180;
                const newX = x + dist * Math.cos(rad);
                const newY = y + dist * Math.sin(rad);

                if (isDown) {
                    ctx.lineTo(newX, newY);
                    ctx.stroke();
                } else {
                    ctx.moveTo(newX, newY);
                }

                x = newX;
                y = newY;
                if (isFilling) fillPath.push({ x, y });
                if (isRunning && currentSpeed > 0) await sleep(currentSpeed); // Animate if running
            } else if (cmd === 'bk' || cmd === 'backward') {
                const dist = parseFloat(val);
                const rad = (angle * Math.PI) / 180;
                const newX = x - dist * Math.cos(rad);
                const newY = y - dist * Math.sin(rad);

                if (isDown) {
                    ctx.lineTo(newX, newY);
                    ctx.stroke();
                } else {
                    ctx.moveTo(newX, newY);
                }

                x = newX;
                y = newY;
                if (isFilling) fillPath.push({ x, y });
                if (isRunning && currentSpeed > 0) await sleep(currentSpeed);
            } else if (cmd === 'rt' || cmd === 'right') {
                angle += parseFloat(val);
                if (isRunning && currentSpeed > 0) await sleep(currentSpeed / 2);
            } else if (cmd === 'lt' || cmd === 'left') {
                angle -= parseFloat(val);
                if (isRunning && currentSpeed > 0) await sleep(currentSpeed / 2);
            } else if (cmd === 'pu' || cmd === 'penup') {
                isDown = false;
            } else if (cmd === 'pd' || cmd === 'pendown') {
                isDown = true;
            } else if (cmd === 'color' || cmd === 'pencolor') {
                color = val;
                ctx.strokeStyle = color;
                ctx.beginPath(); // Start new path for new color
                ctx.moveTo(x, y);
            } else if (cmd === 'fillcolor') {
                fillColor = val;
            } else if (cmd === 'begin_fill') {
                isFilling = true;
                fillPath = [{ x, y }];
            } else if (cmd === 'end_fill') {
                isFilling = false;
                if (fillPath.length > 0) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(fillPath[0].x, fillPath[0].y);
                    for (let i = 1; i < fillPath.length; i++) {
                        ctx.lineTo(fillPath[i].x, fillPath[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                    ctx.restore();
                    // Restore path for stroke
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.strokeStyle = color;
                }
            } else if (cmd === 'pensize') {
                ctx.lineWidth = parseFloat(val);
                ctx.beginPath(); // Start new path for new line width
                ctx.moveTo(x, y);
            } else if (cmd === 'circle') {
                const radius = parseFloat(val);
                // Better approximation:
                const stepLen = (2 * Math.PI * Math.abs(radius)) / 36;
                const turn = 360 / 36 * (radius < 0 ? -1 : 1);
                for (let i = 0; i < 36; i++) {
                    const rad = (angle * Math.PI) / 180;
                    const newX = x + stepLen * Math.cos(rad);
                    const newY = y + stepLen * Math.sin(rad);
                    if (isDown) { ctx.lineTo(newX, newY); ctx.stroke(); } else { ctx.moveTo(newX, newY); }
                    x = newX; y = newY;
                    if (isFilling) fillPath.push({ x, y });
                    angle += turn;
                    if (isRunning && currentSpeed > 0) await sleep(currentSpeed);
                }
            } else if (cmd === 'goto' || cmd === 'setpos') {
                const targetX = parseFloat(val) + width / 2; // Adjust for center origin
                const targetY = height / 2 - parseFloat(parts[2]); // Adjust for center origin and y-flip

                if (isDown) {
                    ctx.lineTo(targetX, targetY);
                    ctx.stroke();
                } else {
                    ctx.moveTo(targetX, targetY);
                }
                x = targetX;
                y = targetY;
                if (isFilling) fillPath.push({ x, y });
                if (isRunning && currentSpeed > 0) await sleep(currentSpeed);
            } else if (cmd === 'dot') {
                const size = parseFloat(val) || 5;
                const dotColor = parts.length > 2 ? parts[2] : color;
                ctx.save();
                ctx.fillStyle = dotColor;
                ctx.beginPath();
                ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
                ctx.beginPath(); // Reset path to avoid connecting
                ctx.moveTo(x, y);
            } else if (cmd === 'speed') {
                const s = parseInt(val);
                // speed 0 = instant (0ms), speed 1 = slow (50ms), speed 10 = fast (5ms)
                if (s === 0) currentSpeed = 0;
                else currentSpeed = Math.max(1, 50 - s * 4);
            }

            // Update turtle icon position for UI
            setLogoState({ x, y, angle: angle + 90 }); // canvas 0 is right, we want 0 to be up
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        executeCommands(ctx);
    }, [commands, isRunning]);

    return (
        <div className="relative inline-block border-2 border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <canvas ref={canvasRef} width={width} height={height} className="block" />
            {/* Turtle Icon */}
            <div
                className="absolute w-4 h-4 text-green-600 transition-all duration-100 ease-linear pointer-events-none"
                style={{
                    left: logoState.x - 8,
                    top: logoState.y - 8,
                    transform: `rotate(${logoState.angle}deg)`
                }}
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22L12 18L22 22L12 2Z" />
                </svg>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-mono pointer-events-none opacity-50">
                ({Math.round(logoState.x - width / 2)}, {Math.round(-(logoState.y - height / 2))})
            </div>
        </div>
    );
};

export default TurtleCanvas;
