import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext} from '../hooks/useAuthContext'

// pages and components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostForm from "./components/PostForm";
import EditForm from "./components/EditForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import ChangePassword from "./components/ChangePassword";

function App() {
  const {user} = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login"/> }/>
          <Route path="/upload" element={user ? <PostForm /> : <Navigate to="/login"/>}/>
          <Route path="/update" element={user ? <EditForm /> : <Navigate to="/login"/>} />
          <Route path="/about" element={user ? <About /> : <Navigate to="/login"/>}/>
          <Route path="about/changepassword" element={user ? <ChangePassword /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
