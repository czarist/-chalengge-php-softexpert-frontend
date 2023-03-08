import { Routes, Route, Link } from "react-router-dom";
import { PostProvider } from "./Context/PostContext";

import { Home } from "./components/Home";

import { PostIndex } from "./components/posts/PostIndex";
import { PostCreate } from "./components/posts/PostCreate";
import { PostEdit } from "./components/posts/PostEdit";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <PostProvider>
      <div className="bg-slate-200">
        <div className="max-w-7xl mx-auto min-h-screen">
          <nav className="navbar navbar-dark bg-dark">
            <ul className="flex">
              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/" style={{ color: "white", textDecoration: "none !important" }}>Home</Link>
              </li>
             
              <li className="m-2 p-2 text-white rounded-md color-white">
                <Link to="/posts" style={{ color: "white", textDecoration: "none !important" }}>Admin</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
          </Routes>
        </div>
      </div>
    </PostProvider>
  );
}

export default App;
