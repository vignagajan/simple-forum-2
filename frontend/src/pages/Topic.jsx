import { useParams } from "react-router-dom";
import axios from "../axios";
import { useEffect, useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

function Topic() {
  let userDetails = null;

  const params = useParams();

  const [topic, setTopic] = useState({});
  const [commentForm, setCommentForm] = useState({ comment: "" });

  const { comment } = commentForm;

  useEffect(() => {
    userDetails = localStorage.getItem("user");

    axios.defaults.headers.common["Authorization"] = `Bearer ${
      localStorage.getItem("user").token
    }`;

    axios
      .get(`/topic/${params.id}`)
      .then((res) => {
        setTopic(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const onChange = (e) => {
    setCommentForm((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Enter a comment");
    }
    axios
      .post(`/topic/${params.id}`, {
        comment: comment[0],
      })
      .then(function (response) {
        console.log("Comment is posted");
        let newComments = topic.comments;
        newComments.push({
          comment: comment[0],
        });
        topic.comments = newComments;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`/topic/${params.id}/${commentId}`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const upVoteTopic = () => {
    axios
      .put(`/topic/${params.id}/up`)
      .then(function (response) {
        console.log(response);
        topic.votes.push({ user: "625fa496cf1e9b640318fcbc" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downVoteTopic = () => {
    axios
      .put(`/topic/${params.id}/down`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const upVoteComment = (commentId) => {
    axios
      .put(`/topic/${params.id}/${commentId}/up`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downVoteComment = (commentId) => {
    axios
      .put(`/topic/${params.id}/${commentId}/down`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      {topic.user ? (
        <div className="row content">
          <div className="d-flex justify-content-between">
            <h2>{topic.title}</h2>
            <br />
          </div>
          <div className="h6">
            <span className="glyphicon glyphicon-time"></span> Asked by{" "}
            {topic.user.name},{" "}
            {new Date(topic.createdAt).toLocaleString("ta-LK")}.
          </div>
          <hr />
          <br />
          <div className="row pb-3">
            <div className="row text-center col-sm-1">
              <FaCaretUp
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => upVoteTopic()}
              />
              <span className="fs-4 text-center">{topic.votes.length}</span>
              <FaCaretDown
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => downVoteTopic()}
              />
            </div>
            <div className="col-sm-11">
              <p>{topic.body}</p>
            </div>
          </div>
          <hr />

          <div className="h6">Leave an Answer:</div>
          <form>
            <div className="form-group">
              <textarea
                id="comment"
                name="comment"
                className="form-control"
                rows="3"
                value={comment}
                onChange={onChange}
                required
              ></textarea>
            </div>
            <button className="btn btn-success" onClick={onSubmit}>
              Submit
            </button>
          </form>
          <br />
          <br />
          <p className="h4 pt-3">
            <span className="badge bg-secondary display-6">
              {topic.comments.length}
            </span>{" "}
            Answers:
          </p>
          <br />
          <hr />
          <div className="row">
            {topic.comments.map((comment, i) => {
              return (
                <div key={i}>
                  <div className="card">
                    <div className="card-header">
                      <span className="glyphicon glyphicon-time"></span>{" "}
                      Answered by {comment.user},{" "}
                      {new Date(comment.createdAt).toLocaleString("ta-LK")}.
                    </div>
                    <div className="card-body">
                      <div className="row pb-3">
                        <div className="col-sm-1">
                          <div className="row text-center">
                            <FaCaretUp
                              style={{ cursor: "pointer" }}
                              size={30}
                              onClick={() => upVoteComment(comment._id)}
                            />
                            <span className="fs-5 text-center">
                              {comment.votes.length}
                            </span>
                            <FaCaretDown
                              style={{ cursor: "pointer" }}
                              size={30}
                              onClick={() => downVoteComment(comment._id)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-11">
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                      <a href="#" style={{ textDecoration: "none" }}>
                        share
                      </a>{" "}
                      <a
                        href="#"
                        style={{ textDecoration: "none" }}
                        onClick={() => deleteComment(comment._id)}
                      >
                        delete
                      </a>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Topic;
