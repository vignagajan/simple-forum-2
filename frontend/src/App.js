import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import MyTopic from "./pages/MyTopic";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import { useContext } from "react";
import { UserDispatchContext } from "./context/UserContext";

function App() {

  const setUserDetails = useContext(UserDispatchContext);

  setUserDetails(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <Router>
      <Header />
        <div className="container"> 
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/logout' element={<Logout />}/>
            <Route path='/topic/:id' element={<Topic />}/>
            <Route path='/my' element={<MyTopic />}/>
          </Routes>

        </div>
      <Footer />
      </Router>
    </>
  );
}

export default App;
