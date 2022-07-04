import "./login.css";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext, UserDispatchContext } from "../context/UserContext.js";

function Register() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails !== null) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { username, email, password, cpassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password[0] !== formData.cpassword[0]) {
      toast.error("Passwords doesnt'match!");
    } else {
      axios
        .post("/user/register", formData)
        .then((res) => {
          setUserDetails(res.data);
          toast.success("Registration is successful!");
          navigate(`/`);
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
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>
              <b>Username:</b>
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
              <b>Email:</b>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
          <div className="form-group">
            <label>
              <b>Confirm Password:</b>
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={cpassword}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="w-100 btn btn-dark">
            Register
          </button>
          <div className="sign-up">
            Already have an account? <Link to="../login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
