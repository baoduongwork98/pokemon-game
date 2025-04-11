import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChildGroupInput.css";
import ChildInputForm from "./ChildInputForm";

const ChildGroupInput = () => {
  const navigate = useNavigate();
  const [childGroup, setChildGroup] = useState([{ name: "", dob: "" }]);

  useEffect(() => {
    const localStorageChildGroup = localStorage.getItem("childGroup");
    if (localStorageChildGroup) {
      const parsedChildGroup = JSON.parse(localStorageChildGroup);
      setChildGroup(parsedChildGroup);
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updatedForms = [...childGroup];
    updatedForms[index][field] = value;
    setChildGroup(updatedForms);
  };

  const handleAddForm = () => {
    if (childGroup.length < 3) {
      setChildGroup([...childGroup, { name: "", dob: "" }]);
      return;
    }
    alert("Bạn chỉ có thể thêm tối đa 3 con!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("childGroup", JSON.stringify(childGroup));
    navigate("/info", { state: { child: childGroup } });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">🎉 Nhập thông tin con của bạn</h2>
        <div className="form-group">
          {childGroup.map((child, index) => (
            <ChildInputForm
              key={index}
              name={child.name}
              dob={child.dob}
              index={index}
              onChange={handleChange}
            />
          ))}
        </div>

        <button type="button" onClick={handleAddForm} className="form-add">
          Thêm
        </button>
        <button type="submit" className="form-submit">
          Tiếp tục
        </button>
      </form>
    </div>
  );
};
export default ChildGroupInput;
