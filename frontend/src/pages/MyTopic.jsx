import { IconContext } from "react-icons";
import { BsFillChatDotsFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import "./home.css";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../context/UserContext.js";

function MyTopic() {
  const userDetails = JSON.parse(localStorage.getItem("user"));

  const [topic, setTopic] = useState([]);
  const [upId, setUpId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "Tech",
    user: userDetails._id,
  });

  const [formState, setFormState] = useState("i");

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userDetails.token}`;

  axios
    .get("/topic/my")
    .then((res) => {
      setTopic(res.data.sort((a, b) => a.createdAt - b.createdAt));
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  useEffect(() => {
    if (userDetails == null) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();

  const { title, body, category, user } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formState == "i") {
      console.log(formData);
      axios
        .post("/topic", formData)
        .then((res) => {
          toast.success("Post created successfully!", { autoClose: 2000 });
          // navigate(`/topic/${res.data._id}`)
          setTopic(
            [res.data, ...topic].sort((a, b) => a.createdAt - b.createdAt)
          );
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    } else {
      axios
        .put(`/topic/${upId}`, formData)
        .then((res) => {
          toast.success("Post updated successfully!", { autoClose: 2000 });
          // navigate(`/topic/${res.data._id}`)
          setTopic(
            [res.data, ...topic].sort((a, b) => a.createdAt - b.createdAt)
          );
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  };

  const fillForm = (item) => {
    setFormState("u");
    setFormData({
      title: item.title,
      body: item.body,
      category: item.category,
      user: userDetails._id,
    });
    setUpId(item._id);
    console.log(upId);
    setTopic(
      topic.filter(function (obj) {
        return obj._id !== upId;
      })
    );
  };

  const deleteTopic = (item) => {
    axios
      .delete(`/topic/${item._id}`)
      .then((res) => {
        setTopic(
          topic.filter(function (obj) {
            return obj._id !== item._id;
          })
        );
        toast.success("Topic deleted successfully!", { autoClose: 2000 });
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="row content">
        <div className="col-sm-9">
          <br />
          <h2>Post a topic </h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                rows="3"
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter your topic title here..."
                onChange={onChange}
                required
              />
              <textarea
                className="form-control"
                rows="3"
                id="body"
                name="body"
                value={body}
                placeholder="Enter your topic details here..."
                onChange={onChange}
                required
              ></textarea>
              <select
                className="form-control form-select"
                aria-label="Choose category"
                value={category}
                onChange={onChange}
                id="category"
                name="category"
              >
                <option disabled>Select category</option>
                <option value="Tech">Tech</option>
                <option value="Food">Food</option>
                <option value="Photography">Photography</option>
              </select>
            </div>
            {(() => {
              switch (formState) {
                case "i":
                  return (
                    <button type="submit" className="w-100 btn btn-success">
                      POST
                    </button>
                  );
                case "u":
                  return (
                    <div className="dflex justify-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "50%", marginRight: "5px" }}
                      >
                        UPDATE
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        style={{ width: "48%", marginLeft: "5px" }}
                        onClick={() => {
                          setFormState("i");
                          setFormData({
                            title: "",
                            body: "",
                            category: "",
                            user: userDetails._id,
                          });
                        }}
                      >
                        CLEAR
                      </button>
                    </div>
                  );
              }
            })()}
          </form>
          <br />
          <br />
          <h4>
            <small>MY TOPICS</small>
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
                    <span className="glyphicon glyphicon-time"></span>
                    {new Date(item.createdAt).toLocaleString("en-US")}.
                  </h6>
                </div>
                <>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary"
                      style={{ width: "10%", marginRight: "10px" }}
                      onClick={() => fillForm(item)}
                    >
                      {" "}
                      Update{" "}
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ width: "10%" }}
                      onClick={() => deleteTopic(item)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                </>
                <hr />
              </div>
            );
          })}
          <br /> <br /> <br />
        </div>

        <div className="col-sm-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyTopic;
