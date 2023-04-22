import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtdecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const pathname = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginCheck = () => {
    const token = localStorage.getItem("USER");
    if (!token) {
      setIsLoggedIn(false);
    }
    if (token) {
      const decodedToken = jwtdecode(token);
      setUsername(decodedToken.username);
      setUserId(decodedToken.userId);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    const token = localStorage.getItem("USER");
    if (token) {
      localStorage.removeItem("USER");
      setUsername("");
      setIsLoggedIn(false);
      navigate("/login");
    }
    navigate("/login");
  };

  useEffect(() => {
    loginCheck();
  }, [isLoggedIn, username, pathname]);

  return (
    <>
      <div className="main-navbar container">
        <nav className="navbar navbar-light bg-white p-3">
          <Link to="/" className="navbar-brand" style={{ fontSize : "30px" , fontWeight: "bold" }}>
            <img className="navbar-logo" src="../favicon.ico" alt="" />
            휴식게시판
          </Link>
          <div className="btn-group dropleft">
            {isLoggedIn ? (
              <>
                <button
                  style={{ color: "black", fontWeight: "bold" }}
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img className="user" src="../user.png" alt="" />
                  {username}님
                </button>
                <div className="dropdown-menu">
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/profile/${userId}`}
                    className="dropdown-item"
                  >
                    프로필
                  </Link>
                  <button onClick={logout} className="dropdown-item">
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  style={{ color: "black", fontWeight: "bold" }}
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img className="userx" src="../nouser.png" alt="" />
                  
                </button>
                <div className="dropdown-menu">
                  <a
                    style={{ color: "black", textDecoration: "none" }}
                    href="/login"
                    className="dropdown-item"
                  >
                    로그인
                  </a>
                  <a
                    style={{ color: "black", textDecoration: "none" }}
                    href="/register"
                    className="dropdown-item"
                  >
                    회원가입
                  </a>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
      <div className="container header">
        <div className="container">
          <div className="link-container">
            <div className="header-link">
              <Link to="/">전체게시판</Link>
            </div>
            <div className="header-link">
              <Link to="/board/자유">자유게시판</Link>
            </div>
            <div className="header-link">
              <Link to="/board/코딩">코딩게시판</Link>
            </div>
            <div className="header-link">
              <Link to="/board/게임">게임게시판</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
