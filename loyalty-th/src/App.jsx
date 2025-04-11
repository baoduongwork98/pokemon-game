import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import GameBoard from "./components/GameBoard";
import GameClaw from "./components/GameClaw";
import RewardPage from "./components/RewardPage";
import LoadingPage from "./components/LoadingPage";
import PermissionPopup from "./components/popup/PermissionPopup";
import GoodByePage from "./components/GoodByePage";
import ChildInputForm from "./components/ChildInputForm";
import ChildGroupInput from "./components/ChildGroupInput";
import InfoPage from "./components/InfoPage";
function HomePage() {
  const navigate = useNavigate();
  const [showAccessPermission, setShowAccessPermission] = React.useState(false);

  const handleAccept = () => {
    localStorage.setItem("accessPermission", "true");
    setShowAccessPermission(false);
    navigate("/child-info");
  };

  const handleDecline = () => {
    localStorage.removeItem("accessPermission");
    setShowAccessPermission(false);

    navigate("/goodbye");

    const timer = setTimeout(() => {
      window.Telegram.WebApp.close();
    }, 1000);
    clearTimeout(timer);
  };

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    const localAccessPermission = localStorage.getItem("accessPermission");
    if (!localAccessPermission) {
      setShowAccessPermission(true);
      return;
    }
    setShowAccessPermission(false);
    navigate("/child-info");
  }, []);

  return (
    <div className="container">
      {showAccessPermission && (
        <PermissionPopup
          title="Yêu cầu quyền truy cập thông tin"
          description="Ứng dụng cần quyền truy cập thông tin để gửi quà đến bạn chính xác."
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/child-info" element={<ChildGroupInput />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/game-claw" element={<GameClaw />} />
          <Route path="/reward" element={<RewardPage />} />
          <Route path="/goodbye" element={<GoodByePage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
