import React from "react";
import "./PermissionPopup.css";

const PermissionPopup = ({ title, description, onAccept, onDecline }) => {
  const [isCheckedInfo, setIsCheckedInfo] = React.useState(false);
  const [isCheckedOA, setIsCheckedOA] = React.useState(false);
  return (
    <div className="permission-overlay">
      <div className="permission-popup">
        <h2 className="permission-title">{title}</h2>
        <p className="permission-desc">{description}</p>
        <div className="checkbox-container">
          <label htmlFor="oa-checkbox">👤</label>
          <label htmlFor="oa-checkbox">Thông tin cá nhân</label>
          <input
            type="checkbox"
            id="oa-checkbox"
            checked={isCheckedInfo}
            onChange={(e) => setIsCheckedInfo(e.target.checked)}
          />
        </div>
        <div className="checkbox-container">
          <label htmlFor="oa-checkbox">🌟</label>
          <label htmlFor="oa-checkbox">Quan tâm OA</label>
          <input
            type="checkbox"
            id="oa-checkbox"
            checked={isCheckedOA}
            onChange={(e) => setIsCheckedOA(e.target.checked)}
          />
        </div>

        <div className="permission-buttons">
          <button
            className="btn-accept"
            onClick={onAccept}
            disabled={!(isCheckedInfo && isCheckedOA)}
            style={{
              opacity: isCheckedInfo && isCheckedOA ? 1 : 0.6,
              cursor: isCheckedInfo && isCheckedOA ? "pointer" : "not-allowed",
            }}
          >
            Cho phép
          </button>
          <button className="btn-decline" onClick={onDecline}>
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionPopup;
