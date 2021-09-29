import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UnknowPersonImage from "../Assets/images/Unknown_person.jpg";
import { getUserData } from "../services/auth.service";
function Header() {
  const [userData, setUserData] = useState({});
  const fetchUser = async () => {
    if (localStorage.getItem("token")) {
      const result = await getUserData();
      setUserData(result.data.data);
    }
  };
  window.addEventListener("storage", fetchUser);

  useEffect(() => {
    fetchUser();
  }, [userData]);
  const logout = () => {
    localStorage.removeItem("token");
    setUserData({});
  };
  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <Link to="/">
            <span className="font-weight-normal">ระบบแนะนำผู้เชี่ยวชาญ</span> |
            SCI-RMUTT
          </Link>
        </h1>
        {localStorage.getItem("token") ? (
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundImage: `url(${UnknowPersonImage})` }}
                ></span>
                <div className="d-none d-xl-block ps-2">
                  <div>{`${userData.firstName} ${userData.lastName}`}</div>
                  <div className="mt-1 small text-muted">
                    วิทยาการคอมพิวเตอร์
                  </div>
                </div>
              </Link>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <Link to="/" className="dropdown-item">
                  Profile & account
                </Link>
                <span onClick={logout} className="dropdown-item">
                  Logout
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Link className="nav-link " to="/login">
            <span className="nav-link-title">
              {" "}
              <i className="fas fa-sign-in-alt" /> เข้าสู่ระบบ
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
