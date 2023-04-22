import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URL;

function Home() {
  const [posts, setPosts] = useState([]);

  const getAllposts = async () => {
    try {
      const response = await fetch(`${API}/allposts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllposts();
  }, [setPosts]);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="main-text">
            <h2>전체게시판</h2>
          </div>
          <div style={{ textAlign: "center" }}></div>
        </div>
        <hr />
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
    </>
  );
}

export default Home;
