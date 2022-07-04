import "./login.css";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext, UserDispatchContext } from "../context/UserContext.js";

function Login() {
  const userDetails = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails !== null) {
      navigate("/my");
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const setUserDetails = useContext(UserDispatchContext);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", formData)
      .then((res) => {
        setUserDetails(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Loggedin successfully!");
        navigate("/my");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>
              <b>Username or email:</b>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <b>Password:</b>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="w-100 btn btn-dark">
            Log In
          </button>
          <div className="sign-up">
            Don't have an account? <Link to="../register">Create One</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
