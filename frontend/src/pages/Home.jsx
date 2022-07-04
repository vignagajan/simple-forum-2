import { IconContext } from "react-icons";
import { BsFillChatDotsFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import "./home.css";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../context/UserContext.js";

function Home() {
  const userDetails = localStorage.getItem("user");

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const [topic, setTopic] = useState([]);

  useEffect(() => {
    if (search === "") {
      axios
        .get("/topic/all")
        .then((res) => {
          setTopic(res.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      setTopic(
        topic.filter(function (obj) {
          return obj.title !== search;
        })
      );
    }
  }, [search]);

  return (
    <>
      <ToastContainer />
      <div className="row content">
        <div className="col-sm-9">
          <br />
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={search}
              onChange={onChange}
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
          <br />
          <br />
          <h4>
            <small>ALL TOPICS</small>
          </h4>
          <hr />
          {topic.map((item, i) => {
            return (
              <div key={i}>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/topic/${item._id}`}
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <h5>{item.title}</h5>
                  </Link>
                  <div className="d-flex justify-content-end">
                    <IconContext.Provider value={{ size: 22 }}>
                      <BsFillHandThumbsUpFill />
                    </IconContext.Provider>
                    &nbsp; <h6>{item.votes.length}</h6> &nbsp;&nbsp;&nbsp;
                    <IconContext.Provider value={{ size: 22 }}>
                      <BsFillChatDotsFill />
                    </IconContext.Provider>
                    &nbsp; <h6>{item.comments.length}</h6> &nbsp;
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>
                    <span className="label label-danger">{item.category}</span>
                  </h6>
                  <br />
                  <h6>
                    <span className="glyphicon glyphicon-time"></span> Post by{" "}
                    {item.user.username},{" "}
                    {new Date(item.createdAt).toLocaleString("en-US")}.
                  </h6>
                </div>
                <hr />
              </div>
            );
          })}
          <br /> <br /> <br />
        </div>

        <div className="col-sm-3">
          <>
            <br />{" "}
            <Link to="/login">
              <button type="submit" className="w-100 btn btn-success">
                {" "}
                {userDetails != null ? "+ Post Topic" : "Login to Post topic"}
              </button>
            </Link>
            <br />
            <br />
            <br />
            <div>
              <h4>Categories</h4>
              <hr />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Home;
