"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [flashlight, setFlashlight] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    setMounted(true);

    const handleClick = (e: MouseEvent) => {
      // Add a new bubble
      const newBubble = { id: Date.now(), x: e.clientX, y: e.clientY };
      setBubbles((prev) => [...prev, newBubble]);

      // Set flashlight position
      setFlashlight({ x: e.clientX, y: e.clientY });

      // Remove flashlight after 300ms
      setTimeout(() => setFlashlight(null), 300);

      // Remove bubble after 2 seconds
      setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 2000);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(225, 225, 225, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(225, 225, 225, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            animation: "moveGrid 20s linear infinite",
          }}
        />

        {/* Floating elements with face-lag effect */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              backgroundColor: i % 2 === 0 ? "#7857FF" : "#E5E7EB",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 10 + 10
              }s linear infinite, faceLag 5s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 10}s, -${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Current flow lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`current-${i}`}
            className="absolute h-0.5 bg-blue-200 opacity-30"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `currentFlow ${
                Math.random() * 5 + 5
              }s linear infinite`,
            }}
          />
        ))}

        {/* Cars driving in roundabout */}
        <div className="absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(5)].map((_, i) => (
            <div
              key={`car-${i}`}
              className="absolute w-4 h-2 bg-purple-400 rounded-sm"
              style={{
                animation: `carRoundabout ${10 + i * 2}s linear infinite`,
                animationDelay: `-${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute w-4 h-4 bg-blue-300 rounded-full opacity-50"
            style={{
              left: bubble.x,
              top: bubble.y,
              animation: "bubbleRise 2s ease-out",
            }}
          />
        ))}

        {/* Flashlight effect */}
        {flashlight && (
          <div
            className="absolute w-32 h-32 rounded-full pointer-events-none"
            style={{
              left: flashlight.x - 64,
              top: flashlight.y - 64,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
              animation: "flashlight 0.3s ease-out",
            }}
          />
        )}

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(120,87,255,0.1),transparent)]" />
      </div>

      {/* Content placeholder */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          The most comprehensive
          <br />
          User Management Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          This is a placeholder for the Clerk hero section content.
        </p>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes moveGrid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(20px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes faceLag {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes currentFlow {
          0% {
            opacity: 0;
            transform: translateX(-100%) rotate(0deg);
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateX(100%) rotate(0deg);
          }
        }

        @keyframes carRoundabout {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) scale(2);
            opacity: 0;
          }
        }

        @keyframes flashlight {
          0% {
            opacity: 1;
            transform: scale(0);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
