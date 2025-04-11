import React from "react";
import { Loader2 } from "lucide-react";
import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <Loader2 className="loading-icon" />
      <h1 className="loading-title">Đang tải Loyalty App...</h1>
      <p className="loading-subtext">Xin vui lòng chờ trong giây lát ✨</p>
    </div>
  );
};

export default LoadingPage;
