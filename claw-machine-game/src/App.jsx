import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import "./styles.css";

const Toy = ({ x, y, src }) => (
  <div className="toy" style={{ left: x, top: y }}>
    <img src={src} alt="toy" />
  </div>
);

const Claw = ({ x, y }) => (
  <div className="claw" style={{ left: x, top: y }}>
    <img src={"./claw.png"} alt="claw" />
  </div>
);

export default function App() {
  const [clawX, setClawX] = useState(100);
  const [clawY, setClawY] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [direction, setDirection] = useState(1);
  const [toys, setToys] = useState([
    { x: 60, y: 300, src: "./th-milk-1.jpg" },
    { x: 100, y: 300, src: "./th-milk-2.jpeg" },
    { x: 140, y: 320, src: "./th-milk-3.jpg" },
    { x: 180, y: 320, src: "./th-milk-4.jpg" },
    { x: 220, y: 300, src: "./gift.png" },
  ]);

  const dropClaw = () => {
    if (isDropping) return;
    setIsDropping(true);
    let y = 0;
    const interval = setInterval(() => {
      y += 5;
      setClawY(y);
      if (y >= 300) {
        clearInterval(interval);
        const caughtToy = toys.find(
          (toy) => Math.abs(toy.x - clawX) < 30 && Math.abs(toy.y - y) < 30
        );
        if (caughtToy) {
          setToys((prev) => prev.filter((toy) => toy !== caughtToy));
        }
        setTimeout(() => {
          setClawY(0);
          setIsDropping(false);
        }, 500);
      }
    }, 20);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDropping) {
        setClawX((x) => {
          console.log(direction);
          const nextX = x + 2 * direction;
          if (nextX >= 260 || nextX <= 0) {
            setDirection(direction * -1);
            console.log("reset d ", direction);
            return Math.max(0, Math.min(260, nextX));
          }
          console.log(nextX);
          return nextX;
        });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isDropping, direction]);

  return (
    <div className="game-container">
      <div className="game-area">
        <Claw x={clawX} y={clawY} />
        {toys.map((toy, idx) => (
          <Toy key={idx} x={toy.x} y={toy.y} src={toy.src} />
        ))}
      </div>
      <div className="controls">
        <Button onClick={() => setClawX((x) => Math.max(0, x - 20))}>⬅️</Button>
        <Button onClick={() => setClawX((x) => Math.min(260, x + 20))}>
          ➡️
        </Button>
        <Button onClick={dropClaw}>🕹️ Drop</Button>
      </div>
    </div>
  );
}
