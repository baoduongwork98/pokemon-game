import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState(false);
  const [showGame, setShowGame] = React.useState(false);
  const closePopup = () => {
    setShowPopup(false);
  };
  const handleClick = () => {
    setShowPopup(true);
    setShowGame(true);
  };
  const handlePlayGame = () => {
    navigate("/game");
    localStorage.setItem("showGame", "true");
  };
  const handleNext = () => {
    localStorage.removeItem("showGame");
    // window.location.reload();
    navigate(0);
  };
  useEffect(() => {
    const showGame = localStorage.getItem("showGame");
    if (showGame === "true") {
      setShowGame(true);
    }
  }, []);
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    console.log("User data:", tg.initDataUnsafe?.user);
  }, []);
  return (
    <div className="container">
      {!showGame && (
        <div>
          <h2>Xác nhận đổi điểm</h2>
          <button className="btn" onClick={handleClick}>
            <span className="btn__text">Xác nhận</span>
          </button>
        </div>
      )}
      {showGame && (
        <div>
          <h2>Chúc mừng bạn đã tích được 100 điểm</h2>
          <button onClick={handleNext}>Tiếp tục</button>
        </div>
      )}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Congratulations! 🎉</h2>
            <p>Bạn đã tích được 100 điểm.</p>
            <p>Bạn có muốn được nhân đôi điểm?</p>
            <p>Nếu đồng ý hãy tham gia trò chơi </p>
            <h1 className="lb-game">Memory Pokemon</h1>
            <button onClick={handlePlayGame}>Có</button>
            {"   "}
            <button onClick={closePopup}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<GameBoard />} />
    </Routes>
  );
}

export default App;
