import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtdecode from "jwt-decode";
const API = process.env.REACT_APP_API_URL;

function Write() {
  const navigate = useNavigate();
  const { genre } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [userId, setUserId] = useState("");
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

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
  };

  const handleKeyDown = (e) => {
    if(e.keyCode === 13 && e.shiftKey) {
        setContent((prevContent) => prevContent + "\n");
    } else if(e.keyCode === 13) {
        e.preventDefault();
    }
  }

  const CheckingToken = () => {
    const token = localStorage.getItem("USER");
    if (token) {
      const decodedToken = jwtdecode(token);
      setUserId(decodedToken.userId);
      setWriter(decodedToken.username);
    } else {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  };

  useEffect(() => {
    CheckingToken();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    }
    if (content === "") {
      alert("내용을 입력해주세요");
      return;
    }
    try {
      const postData = {
        genre: genre,
        title: title,
        content: content,
        writer: writer,
        userId: userId,
        createdAt: createdAt,
      };

      const response = await fetch(`${API}/write/${genre}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (data.success) {
        alert("글을 저장했습니다");
        navigate("/board/" + genre);
      } else {
        alert("글을 저장하지 못했습니다");
        handleReset();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="main-text">
          <h2>{genre}게시판 글작성</h2>
        </div>
        <hr />
        <div className="write-bg">
          <div className="write-item">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">작성자&nbsp;&nbsp;:&nbsp;&nbsp;{writer}</div>
              <input
                value={title}
                onChange={handleTitle}
                className="write-input-title mt-3"
                type="text"
                placeholder="제목"
              />
              <textarea
                value={content}
                onChange={handleContent}
                onKeyDown={handleKeyDown}
                className="write-input-content mt-4"
                type="text"
                placeholder="내용"
              />
              <div className="mt-5">
                <button type="submit" className="btn btn-primary">
                  제출
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Write;
