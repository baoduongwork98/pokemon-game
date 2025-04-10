import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import GameClaw from "./components/GameClaw";
import RewardPage from "./components/RewardPage";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = React.useState(false);
  const [showChoose, setShowChoose] = React.useState(false);

  const closePopup = () => {
    setShowPopup(false);
    navigate("/reward");
  };
  const handleClick = () => {
    setShowPopup(true);
  };
  const handlePlayGame = () => {
    navigate("/game");
    // setShowChoose(true);
    localStorage.setItem("showGame", "true");
  };

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }, []);

  return (
    <div className="container">
      <div>
        <h2>Xác nhận đổi điểm</h2>
        <button className="btn" onClick={handleClick}>
          <span className="btn__text">Xác nhận</span>
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Chúc mừng! 🎉</h2>
            <p>Bạn đã tích được 100 điểm.</p>
            <p>Bạn có muốn được nhận thêm quà tặng?</p>
            <p>Cách thức thông qua tham gia trò chơi</p>
            <button onClick={handlePlayGame}>Có</button>
            {"   "}
            <button onClick={closePopup}>Đóng</button>
          </div>
        </div>
      )}

      {showChoose && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="choose-game">
              <h2>Chọn trò chơi</h2>
              <button className="btn" onClick={() => navigate("/game")}>
                Memory Pokemon
              </button>
              {"   "}
              <button className="btn" onClick={() => navigate("/game-claw")}>
                Game Claw
              </button>
            </div>
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
      <Route path="/game-claw" element={<GameClaw />} />
      <Route path="/reward" element={<RewardPage />} />
    </Routes>
  );
}

export default App;
