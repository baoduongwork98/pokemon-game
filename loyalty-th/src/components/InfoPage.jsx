import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./InfoPage.css";

const InfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const child = location.state?.child || [];
  const [userInfo, setUserInfo] = React.useState({});
  const [showPopup, setShowPopup] = React.useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe.user;
    setUserInfo(user);
  }, []);

  const handleNextPage = () => {
    setShowPopup(true);
    // navigate("/");
  };
  const handleBackPage = () => {
    window.history.back();
  };

  const handlePlayGame = () => {
    navigate("/game");
    localStorage.setItem("showGame", "true");
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/reward");
  };

  return (
    <div>
      <div className="display-container">
        <h2 className="display-title"> Xác nhận thông tin</h2>
        <div className="display-content">
          <div className="display-box">
            <h2 className="display-title">📋 Thông tin của bạn</h2>
            <div className="user-card">
              <p>
                <strong>Họ và tên:</strong> {userInfo?.first_name}{" "}
                {userInfo?.last_name}
              </p>
            </div>
          </div>
          <div className="display-box">
            <h2 className="display-title">📋 Thông tin của con</h2>
            {child.map((user, index) => (
              <div key={index} className="user-card">
                <p>
                  <strong>Họ và tên:</strong> {user.name}
                </p>
                <p>
                  <strong>Ngày sinh:</strong> {user.dob}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" onClick={handleNextPage} className="form-submit">
          Xác nhận
        </button>
        <button type="submit" onClick={handleBackPage} className="form-submit">
          Quay lại
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
            <button onClick={closePopup}>Không</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
