import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Navbar from "./components/Navbar.js";
import Write from "./pages/Write.js";
import Board from "./pages/Board.js";
import Post from "./pages/Post.js";
import Update from "./pages/Update.js";
import Profile from "./pages/Profile.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/board/:genre" element={<Board />} />
        <Route path="/write/:genre" element={<Write />} />
        <Route path="/update/:genre/:id" element={<Update />} />
        <Route path="/board/:genre/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
