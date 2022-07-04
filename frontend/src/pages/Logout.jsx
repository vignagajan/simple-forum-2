import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../context/UserContext";

function Logout() {
  const setUserDetails = useContext(UserDispatchContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, []);
}

export default Logout;
