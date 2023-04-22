import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginPw2, setLoginPw2] = useState("");
  const [checkedUsername, setCheckedUsername] = useState("");
  const date = new Date();
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  };
  const createdAt = date.toLocaleString("ko-KR", options);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleLoginId = (e) => {
    setLoginId(e.target.value);
  };
  const handleLoginPw = (e) => {
    setLoginPw(e.target.value);
  };
  const handleLoginPw2 = (e) => {
    setLoginPw2(e.target.value);
  };

  const handleReset = () => {
    setUsername("");
    setLoginId("");
    setLoginPw("");
    setLoginPw2("");
  };

  const checkUsername = async () => {
    if (username === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    try {
      const response = await fetch(`${API}/checkusername`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const duplication = await response.json();

      console.log(duplication.success);
      if (duplication.success) {
        alert("사용가능한 닉네임 입니다");
        setCheckedUsername(duplication.username);
      } else {
        alert("이미 존재하는 닉네임 입니다");
        handleReset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (loginId === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (loginPw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (loginPw !== loginPw2) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (username !== checkedUsername) {
      alert('닉네임 중복확인을 해주세요');
      return
    }

    try {
      const resgisterData = {
        username: username,
        loginId: loginId,
        loginPw: loginPw,
        createdAt: createdAt,
      };
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resgisterData),
      });
      const data = await response.json();
      if (data.success) {
        alert('회원가입에 성공하였습니다')
        navigate("/login");
      } else {
        alert('이미 사용중인 아이디 입니다');
        return
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log( username, loginId, loginPw, loginPw2 );

  return (
    <div className="register-page-wrap">
      <div className="register-wrap container">
        <div className="register-box">
          <div className="logo-box">
            <img src="../favicon.ico" alt="" />
            휴식게시판
          </div>
          <div>
            <div className="hr-box">
              <hr />
            </div>
          </div>
          <div className="register-text">
            <span>회원가입</span>
          </div>
          <div>
            <div className="hr-box">
              <hr />
            </div>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-name">
              <input
                value={username}
                onChange={handleUsername}
                className="register-name-input"
                type="text"
                placeholder="닉네임"
              />
            </div>
            <div className="duplicate-btn">
              <button
                type="button"
                onClick={checkUsername}
                className="duplicate-button btn btn-warning"
              >
                중복확인
              </button>
            </div>
            <div className="register-id">
              <input
                value={loginId}
                onChange={handleLoginId}
                className="register-id-input"
                type="text"
                placeholder="아이디"
              />
            </div>
            <div className="register-pw">
              <input
                value={loginPw}
                onChange={handleLoginPw}
                className="register-pw-input"
                type="password"
                placeholder="비밀번호"
              />
            </div>
            <div className="register-pw2">
              <input
                value={loginPw2}
                onChange={handleLoginPw2}
                className="register-pw2-input"
                type="password"
                placeholder="비밀번호 확인"
              />
            </div>
            <div className="register-btn">
              <button type="submit" className="register-button btn btn-primary">
                가입
              </button>
            </div>
          </form>
          <div className="go-to-login">
            <span>계정이 있으신가요?</span>
            <Link to="/login" style={{ textDecoration: "none" }}>
              &nbsp;로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
