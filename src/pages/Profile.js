import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
const API = process.env.REACT_APP_API_URL;

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  console.log(posts);

  const loginCheck = () => {
    const token = localStorage.getItem("USER");
    if (!token) {
      setIsLoggedIn(false);
      alert("로그인이 필요합니다");
      navigate("/login");
    }
    if (token) {
      const decodedToken = jwtdecode(token);
      setUsername(decodedToken.username);
      setIsLoggedIn(true);
    }
  };

  const getuserPosts = async () => {
    try {
      const response = await fetch(`${API}/userposts/${id}`);
      const userposts = await response.json();
      setPosts(userposts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loginCheck();
    getuserPosts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <div className="main-text">
          <h2>{username}님의 프로필</h2>
        </div>
        <div style={{ textAlign: "center" }}></div>
      </div>
      <hr />
      <h4>내가 작성한 게시물</h4>
      <div className="list-bg">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="list-item">
              <p>{post.genre}게시판</p>
              <p>
                No. {post.postNumber}&nbsp;|&nbsp;{post.writer.username}
                &nbsp;|&nbsp;{post.createdAt}
              </p>
              <hr />
              <Link to={`/board/${post.genre}/${post._id}`}>{post.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
