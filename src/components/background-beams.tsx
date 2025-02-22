import React, { useEffect, useRef } from 'react';

export const BackgroundBeams = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBeam = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 200 + 100,
      opacity: Math.random() * 0.5 + 0.1,
      width: Math.random() * 8 + 2,
    });

    const beams = Array(20).fill().map(createBeam);

    const drawBeams = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      beams.forEach((beam) => {
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(beam.x, beam.y + beam.length);
        ctx.strokeStyle = `rgba(100, 200, 255, ${beam.opacity})`;
        ctx.lineWidth = beam.width;
        ctx.stroke();
      });
    };

    const animate = () => {
      drawBeams();
      beams.forEach((beam) => {
        beam.y -= 2;
        if (beam.y + beam.length < 0) {
          Object.assign(beam, createBeam(), { y: canvas.height });
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};