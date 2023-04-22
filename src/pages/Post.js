import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
const API = process.env.REACT_APP_API_URL;

function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { genre } = useParams();
  const [posts, setPosts] = useState({});
  const [writer, setWriter] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
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
  const commentAt = date.toLocaleString("ko-KR", options);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleReset = () => {
    setComment("");
  };

  const CheckingToken = () => {
    const token = localStorage.getItem("USER");
    if (token) {
      const decodedToken = jwtdecode(token);
      setUsername(decodedToken.username);
    } else {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  };

  const getPost = async () => {
    const response = await fetch(`${API}/post/${id}`);
    const data = await response.json();
    setPosts(data);
    setWriter(data.writer);
  };

  const getComment = async () => {
    const response = await fetch(`${API}/comment/${id}`);
    const commentsData = await response.json();
    setComments(commentsData.comments);
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`${API}/board/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        navigate("/board/" + genre);
      }
    } catch (error) {}
  };

  const deleteComment = async (commentId) => {
    try {
      const postId = id;
      const response = await fetch(`${API}/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        getComment();
      } else {
        alert("댓글을 삭제하는데 실패하였습니다");
      }
    } catch (error) {}
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const commentData = {
      comment: comment,
      commentBy: username,
      commentAt: commentAt,
    };
    if (comment === "") {
      alert("댓글을 작성해주세요");
      return;
    }
    const response = await fetch(`${API}/newcomment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    const responseData = await response.json();
    if (responseData) {
      handleReset();
      getComment();
    }
  };
  useEffect(() => {
    getPost();
    CheckingToken();
    getComment();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-4">
      <div className="post-bg">
        <div className="main-text">
          <h2>{genre}게시판</h2>
        </div>
        <hr />
        <div className="post-item">
          <div
            className="post-title mb-3 d-flex"
            style={{ justifyContent: "space-between" }}
          >
            <h3>{posts.title}</h3>
            {writer.username === username ? (
              <div className="button-group">
                <Link to={`/update/${genre}/${posts._id}`}>✏️</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button
                  onClick={() => {
                    if (window.confirm("게시물을 삭제하시겠습니까?")) {
                      deletePost();
                    }
                  }}
                  className="deletebtn"
                >
                  🗑️
                </button>
              </div>
            ) : null}
          </div>
          <p>
            No. {posts.postNumber}&nbsp;|&nbsp; {writer.username} &nbsp;|&nbsp;
            {posts.createdAt}
          </p>
          <hr />
          <div className="post-content mb-2">
            <h5 style={{ whiteSpace: "pre" }}>{posts.content}</h5>
          </div>
          <hr />
          <div className="comment-bg">
            <p className="mb-2">댓글수 {comments.length}개</p>
            <form className="mb-2" onSubmit={submitComment}>
              <div className="d-flex mb-2">
                <p className="commentBy mb-3">{username}</p>
                <input
                  value={comment}
                  onChange={handleComment}
                  className="comment-input mb-2"
                  type="text"
                  placeholder="댓글 추가. . ."
                />
              </div>
              <div className="btngroup">
                <button type="submit" className="btn btn-secondary">
                  등록
                </button>
              </div>
            </form>
            {comments
              .sort((a, b) => new Date(b.commentAt) - new Date(a.commentAt))
              .map((comment) => (
                <div key={comment._id}>
                  <div className="comment-item mt-3">
                    <div
                      className="d-flex mb-2"
                      style={{ justifyContent: "space-between" }}
                    >
                      <p>
                        {comment.commentBy}&nbsp;|&nbsp;{comment.commentAt}
                      </p>
                      {comment.commentBy === username ? (
                        <button
                          onClick={() => {
                            if (window.confirm("댓글을 삭제하시겠습니까?")) {
                              deleteComment(comment._id);
                            }
                          }}
                          className="deletebtn"
                        >
                          🗑️
                        </button>
                      ) : null}
                    </div>
                    <p className="mb-2" style={{ whiteSpace: "pre" }}>
                      {comment.comment}
                    </p>
                    {/* <div class="like">👍 0</div> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
