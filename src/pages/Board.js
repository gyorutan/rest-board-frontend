import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URL;

function Board() {
  const { genre } = useParams();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch(`${API}/board`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [setPosts]);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="main-text">
            <h2>{genre}게시판</h2>
          </div>
          <div className="goToWrite">
            <Link to={"/write/" + genre}>글쓰기</Link>
          </div>
        </div>
        <hr />
        <div className="list-bg">
          {posts.map((post) =>
            post.genre === genre ? (
              <div key={post._id}>
                <div className="list-item">
                  <p>
                    No. {post.postNumber}&nbsp;|&nbsp;{post.writer.username}
                    &nbsp;|&nbsp;{post.createdAt}
                  </p>
                  <hr />
                  <Link to={`${post._id}`}>{post.title}</Link>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default Board;
