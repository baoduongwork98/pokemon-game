import React from "react";
import "./ChildInputForm.css";

const ChildInputForm = ({ name, dob, onChange, index }) => {
  return (
    <div>
      <div className="form-container-child">
        <div className="form-box-child">
          <label>
            Họ và tên:
            <input
              type="text"
              value={name}
              placeholder="Nhập tên con của bạn"
              onChange={(e) => onChange(index, "name", e.target.value)}
              required
            />
          </label>

          <label>
            Ngày sinh:
            <input
              type="date"
              value={dob}
              onChange={(e) => onChange(index, "dob", e.target.value)}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChildInputForm;
