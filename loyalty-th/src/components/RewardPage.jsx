import React, { useState } from "react";
import "./RewardPage.css";

const stores = [
  "Cửa hàng Vincom Quang Trung",
  "Cửa hàng AEON Mall Tân Phú",
  "Cửa hàng Crescent Mall",
  "Cửa hàng Mega Mall Thảo Điền",
];

const RewardPage = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [showCode, setShowCode] = useState(false);

  const handleClaim = () => {
    if (selectedStore) {
      localStorage.removeItem("accessPermission");
      localStorage.removeItem("childGroup");
      setShowCode(true);
    } else {
      setShowCode(false);
      alert("⚠️ Vui lòng chọn cửa hàng trước khi nhận quà.");
    }
  };

  return (
    <div className="gift-container">
      <div className="gift-box">
        <h2 className="gift-title">🎁 Nhận Quà </h2>

        <p className="gift-text">Hãy chọn cửa hàng mà bạn muốn nhận quà nhé!</p>

        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="store-select"
        >
          <option value="">-- Chọn cửa hàng --</option>
          {stores.map((store, idx) => (
            <option key={idx} value={store}>
              {store}
            </option>
          ))}
        </select>
        {showCode && (
          <div className="code-text">
            <h3>Mã quà tặng của bạn:</h3>
            <p>ABC123XYZ</p>
            <p>
              <strong>Hướng dẫn:</strong> Hãy đến cửa hàng đã chọn và cung cấp
              mã quà tặng này cho nhân viên để nhận quà.
            </p>
          </div>
        )}
        {!showCode && (
          <button className="claim-btn" onClick={handleClaim}>
            🎈 Nhận quà ngay
          </button>
        )}
      </div>
    </div>
  );
};

export default RewardPage;
