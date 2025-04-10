import React, { useState } from "react";
import "./RewardPage.css"; // Import your CSS file for styling

const RewardPage = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [gift, setGift] = useState("");

  const stores = ["Store A", "Store B", "Store C"];
  const gifts = {
    "Store A": ["Gift A1", "Gift A2", "Gift A3"],
    "Store B": ["Gift B1", "Gift B2", "Gift B3"],
    "Store C": ["Gift C1", "Gift C2", "Gift C3"],
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
    setGift("");
  };

  const handleGiftSelect = (event) => {
    setGift(event.target.value);
  };

  return (
    <div className="reward-page">
      <h1 className="reward-page-title">Nhận quà</h1>
      <div className="store-selection">
        <label htmlFor="store-select" className="store-label">
          Chọn cửa hàng:
        </label>
        <select
          id="store-select"
          value={selectedStore}
          onChange={handleStoreChange}
          className="store-dropdown"
        >
          <option value="">--Chọn cửa hàng--</option>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {selectedStore && (
        <div className="gift-selection">
          <label htmlFor="gift-select" className="gift-label">
            Chọn quà tặng:
          </label>
          <select
            id="gift-select"
            value={gift}
            onChange={handleGiftSelect}
            className="gift-dropdown"
          >
            <option value="">--Chọn quà--</option>
            {gifts[selectedStore].map((giftItem) => (
              <option key={giftItem} value={giftItem}>
                {giftItem}
              </option>
            ))}
          </select>
        </div>
      )}

      {gift && (
        <div className="selection-summary">
          <h2 className="summary-title">Quà của bạn:</h2>
          <p className="summary-details">
            Cửa hàng: {selectedStore} <br />
            Quà: {gift}
            <br />
            Mã quà: {Math.floor(Math.random() * 1000000)}
          </p>
        </div>
      )}
    </div>
  );
};

export default RewardPage;
