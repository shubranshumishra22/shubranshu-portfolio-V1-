"use client";

import { useEffect, useRef, useState } from "react";

interface ArcadeGameProps {
  onExit: () => void;
}

export default function ArcadeGame({ onExit }: ArcadeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Snake parameters
  const gridCount = 20;
  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const directionRef = useRef<{ x: number; y: number }>({ x: 0, y: -1 });
  const foodRef = useRef<{ x: number; y: number }>({ x: 5, y: 5 });
  const gameLoopRef = useRef<number | null>(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("snake-hi-score");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", " "].includes(e.key)) {
        e.preventDefault(); // Stop page scrolling
      }

      if (!gameStarted) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
          setGameStarted(true);
          return;
        }
      }

      if (gameOver) {
        if (e.key === "Enter" || e.key === "r" || e.key === "R") {
          resetGame();
        }
        if (e.key === "Escape" || e.key === "x" || e.key === "X") {
          onExit();
        }
        return;
      }

      const dir = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (dir.y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (dir.y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (dir.x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (dir.x === 0) directionRef.current = { x: 1, y: 0 };
          break;
        case "Escape":
          onExit();
          break;
        case " ":
        case "Spacebar":
          setIsPaused((p) => !p);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, gameStarted, onExit]);

  const resetGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    directionRef.current = { x: 0, y: -1 };
    spawnFood();
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
  };

  const spawnFood = () => {
    let newFood: { x: number; y: number } = { x: 0, y: 0 };
    const snake = snakeRef.current;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * gridCount),
        y: Math.floor(Math.random() * gridCount),
      };
      // Check collision with snake
      const onSnake = snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
      if (!onSnake) break;
    }
    foodRef.current = newFood;
  };

  const update = () => {
    if (gameOver || isPaused || !gameStarted) return;

    const snake = [...snakeRef.current];
    const head = snake[0];
    const dir = directionRef.current;

    // Next position
    const nextHead = {
      x: head.x + dir.x,
      y: head.y + dir.y,
    };

    // Collision with wall
    if (
      nextHead.x < 0 ||
      nextHead.x >= gridCount ||
      nextHead.y < 0 ||
      nextHead.y >= gridCount
    ) {
      handleGameOver();
      return;
    }

    // Collision with self
    const hitSelf = snake.some((seg) => seg.x === nextHead.x && seg.y === nextHead.y);
    if (hitSelf) {
      handleGameOver();
      return;
    }

    // Add new head
    snake.unshift(nextHead);

    // Collision with food
    if (nextHead.x === foodRef.current.x && nextHead.y === foodRef.current.y) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("snake-hi-score", newScore.toString());
      }
      spawnFood();
    } else {
      // Remove tail if didn't eat
      snake.pop();
    }

    snakeRef.current = snake;
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderCanvas = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(5, 5, 5, 0.45)"; // Faint trailing path effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellSize = canvas.width / gridCount;

      // Draw grid lines (very faint vector look)
      ctx.strokeStyle = "rgba(124, 255, 138, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= gridCount; i++) {
        // Vertical
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();

        // Horizontal
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      // Draw food (glowing vector circle)
      const food = foodRef.current;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#7CFF8A";
      ctx.fillStyle = "#7CFF8A";
      ctx.beginPath();
      ctx.arc(
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        cellSize / 3.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw Snake (glowing vector squares)
      const snake = snakeRef.current;
      snake.forEach((segment, index) => {
        // Head is brighter
        ctx.fillStyle = index === 0 ? "#7CFF8A" : "rgba(124, 255, 138, 0.7)";
        ctx.shadowBlur = index === 0 ? 12 : 6;
        ctx.fillRect(
          segment.x * cellSize + 1.5,
          segment.y * cellSize + 1.5,
          cellSize - 3,
          cellSize - 3
        );
      });

      ctx.shadowBlur = 0; // Reset shadow
    };

    const loop = () => {
      update();
      renderCanvas();
      gameLoopRef.current = window.setTimeout(loop, 130 - Math.min(score / 4, 60)); // speed increases slightly
    };

    loop();

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, gameStarted, score]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between font-terminal text-[8.5px] min-h-[140px] leading-relaxed text-left phosphor-text">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-[#7CFF8A]/20 pb-1 mb-1 select-none">
        <div>SCORE: {score.toString().padStart(3, "0")}</div>
        <div className="text-[#7CFF8A]/75 text-[8.5px]">MATRIX-SNAKE (v1.0.0)</div>
        <div>HI-SCORE: {highScore.toString().padStart(3, "0")}</div>
      </div>

      {/* Screen Game Area */}
      <div className="relative flex-1 w-full bg-black/60 rounded-[3px] overflow-hidden flex items-center justify-center border border-[#7CFF8A]/10">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full aspect-square"
        />

        {/* Start Overlay */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-3 select-none">
            <div className="text-[11px] font-bold mb-2 animate-pulse text-[#7CFF8A]">PRESS ENTER TO START</div>
            <div className="text-[8px] opacity-70 space-y-0.5">
              <p>Move: WASD / Arrow Keys</p>
              <p>Pause: Spacebar</p>
              <p>Exit: Escape</p>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-3 select-none">
            <div className="text-[12px] font-bold text-red-500 mb-1.5">SYS FAULT: GAME OVER</div>
            <div className="text-[9px] opacity-90 mb-2">
              <p>FINAL SCORE: {score}</p>
            </div>
            <div className="flex gap-4 text-[9px]">
              <button
                onClick={resetGame}
                className="underline hover:text-white cursor-pointer font-bold"
              >
                [R] RESTART
              </button>
              <button
                onClick={onExit}
                className="underline hover:text-white cursor-pointer font-bold"
              >
                [ESC] EXIT
              </button>
            </div>
          </div>
        )}

        {/* Paused Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-center p-3 select-none">
            <div className="text-[11px] font-bold animate-pulse text-[#7CFF8A]">SYSTEM PAUSED</div>
            <div className="text-[8px] opacity-70">Press Spacebar to resume</div>
          </div>
        )}
      </div>

      {/* Footer Exit Instructions */}
      <div className="flex items-center justify-between border-t border-[#7CFF8A]/10 pt-1 mt-1 text-[8px] opacity-60 select-none">
        <span>[Arrow Keys] Navigate</span>
        <button
          onClick={onExit}
          className="underline hover:text-white cursor-pointer"
        >
          [ESC] Return to Shell
        </button>
      </div>

    </div>
  );
}
