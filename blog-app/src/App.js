import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
 import NewPost from './pages/NewPost';
import MyPosts from "./pages/Dashboard";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<EditPost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
