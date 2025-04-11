import React from "react";
import "./GoodByePage.css";

const GoodByePage = () => {
  return (
    <div className="goodbye-container">
      <div className="goodbye-box">
        <h1 className="goodbye-title">👋 Hẹn gặp lại!</h1>
        <p className="goodbye-message">
          Bạn đã từ chối cấp quyền truy cập, nên chúng tôi không thể tiếp tục
          trải nghiệm Loyalty cùng bạn 😢
        </p>
        <p className="goodbye-small">
          Bạn luôn có thể quay lại bất cứ lúc nào nhé!
        </p>
      </div>
    </div>
  );
};

export default GoodByePage;
