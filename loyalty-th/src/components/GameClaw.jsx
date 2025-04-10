import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import "./GameClaw.css";
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
const giftList = [
  { id: 1, name: "Milk-1", img: "th-milk-1.jpg" },
  { id: 2, name: "Milk-2", img: "th-milk-2.jpeg" },
  { id: 3, name: "Milk-3", img: "th-milk-3.jpg" },
  { id: 4, name: "Milk-4", img: "th-milk-4.jpg" },
];

const GameClaw = () => {
  const navigate = useNavigate();
  const [clawX, setClawX] = useState(100);
  const [clawY, setClawY] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [timerActive, setTimerActive] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [direction, setDirection] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [giftWon, setGiftWon] = useState(null);
  const [toys, setToys] = useState([
    { x: 60, y: 300, src: "./th-milk-1.jpg" },
    { x: 100, y: 300, src: "./th-milk-2.jpeg" },
    { x: 140, y: 320, src: "./th-milk-3.jpg" },
    { x: 180, y: 320, src: "./th-milk-4.jpg" },
    { x: 220, y: 300, src: "./gift.png" },
  ]);

  const dropClaw = () => {
    if (isDropping) return;
    if (!timerActive && timeLeft > 0) {
      setTimerActive(true); // Start timer when cards are loaded
    }
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
    let timer;
    if (timerActive && timeLeft > 0 && !gameWon) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, gameWon]);

  useEffect(() => {
    if (toys.length === 0) {
      const randomGift = giftList[Math.floor(Math.random() * giftList.length)];
      setGiftWon(randomGift);
      setShowPopup(true);
      setGameWon(true);
      setTimerActive(false);
    }
  }, [toys]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDropping) {
        setClawX((x) => {
          const nextX = x + 2 * direction;
          if (nextX >= 260 || nextX <= 0) {
            setDirection(direction * -1);
            return Math.max(0, Math.min(260, nextX));
          }
          return nextX;
        });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isDropping, direction]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const goBack = () => {
    // Logic to go back to the previous page
    navigate("/reward");
  };

  return (
    <div className="game-container">
      <div className="game-stats">
        <p>Thời gian: {formatTime(timeLeft)}</p>
        {/* <button onClick={resetGame}>New Game</button> */}
      </div>
      <div className="game-area">
        <Claw x={clawX} y={clawY} />
        {toys.map((toy, idx) => (
          <Toy key={idx} x={toy.x} y={toy.y} src={toy.src} />
        ))}
      </div>
      <div className="controls">
        <Button onClick={dropClaw}>🕹️ Gắp</Button>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Chúc mừng! 🎉</h2>
            <p>Bạn đã chiến thắng!</p>
            <p>Thời gian còn lại: {formatTime(timeLeft)}</p>
            {giftWon && (
              <div className="gift-won">
                <h3>Quà của bạn!</h3>
                <img
                  src={giftWon.img}
                  alt={giftWon.name}
                  className="gift-image"
                />
                <p className="gift-name">{giftWon.name}</p>
              </div>
            )}
            <button onClick={goBack}>Trở lại</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameClaw;
