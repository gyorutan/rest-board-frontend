import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const handleLoginId = (e) => {
    setLoginId(e.target.value);
  };
  const handleLoginPw = (e) => {
    setLoginPw(e.target.value);
  };
  const handleReset = () => {
    setLoginId("");
    setLoginPw("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginId === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (loginPw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    try {
      const loginData = {
        loginId: loginId,
        loginPw: loginPw,
      };
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("USER", data.token);
        alert("로그인에 성공하였습니다");
        navigate("/");
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다");
        handleReset();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page-wrap container">
      <div className="login-wrap container">
        <div className="login-box">
          <div className="logo-box">
            <img src="../favicon.ico" alt="" />
            휴식게시판
          </div>
          <div>
            <div className="hr-box">
              <hr />
            </div>
          </div>
          <div className="login-text">
            <span>로그인</span>
          </div>
          <div>
            <div className="hr-box">
              <hr />
            </div>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-id">
              <input
                value={loginId}
                onChange={handleLoginId}
                className="login-id-input"
                type="text"
                placeholder="아이디"
              />
            </div>
            <div className="login-pw">
              <input
                value={loginPw}
                onChange={handleLoginPw}
                className="login-pw-input"
                type="password"
                placeholder="비밀번호"
              />
            </div>
            <div className="login-btn">
              <button type="submit" className="login-button btn btn-primary">
                로그인
              </button>
            </div>
          </form>
          <div className="go-to-register">
            <span>회원이 아니신가요?</span>
            <Link to="/register" style={{ textDecoration: "none" }}>
              &nbsp;회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
