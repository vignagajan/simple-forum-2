const asyncHandler = require("express-async-handler");

const Topic = require("../models/topicModel");

/*
    desc: Get All Comments
    route: GET /api/topic/:id/comments
    access: Public
*/

const getComments = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate("user");

  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }

  res.status(200).json(topic.comments);
});

/*
    desc: Add comment
    route: GET /api/topic/:id
    access: Private
*/
const addComment = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  console.log(req.body)
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  //check comment
  if (!req.body.comment) {
    res.status(400);
    throw new Error("Please enter a comment");
  }
  topic.comments.push({
    comment: req.body.comment,
    user: req.user.id,
  });
  topic.save(function (err) {
    if (err) {
      res.status(400);
      throw new Error(err);
    }
  });
  res.status(200).json({ comment: req.body.comment, user: req.user.id });
});

/*
    desc: update comment
    route: PUT /api/topic/:id/:cid
    access: Private
*/
const updateComment = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  const comment = topic.comments.id(req.params.cid);
  comment.comment = req.body.comment;
  topic.save(function (err) {
    if (err) {
      res.status(400);
      throw new Error(err);
    }
  });
  res.status(200).json({ message: `Updated comment: ${req.params.cid}` });
});

/*
    desc: Delete comment
    route: DELETE /api/topic/:id/:cid
    access: Private
*/
const deleteComment = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  topic.comments.id(req.params.cid).remove();

  topic.save(function (err) {
    if (err) {
      res.status(400);
      throw new Error(err);
    }
  });
  res
    .status(200)
    .json({ message: `Comment with id: ${req.params.cid} Deleted` });
});

/*
    desc: Up Vote comment
    route: PUT /api/topic/:id/:cid/up
    access: Private
*/
const upVoteComment = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  const comment = topic.comments.id(req.params.cid);
  if (comment.votes.find((el) => el.user == req.user.id)) {
    res.status(400);
    throw new Error("Already voted");
  }
  comment.votes.push({ user: req.user.id });
  topic.save(function (err) {
    if (err) {
      res.status(400);
      throw new Error(err);
    }
  });
  res.status(200).json({ message: `Up voted comment: ${req.params.cid}` });
});

/*
    desc: Down Vote comment
    route: PUT /api/topic/:id/:cid/down
    access: Private
*/
const downVoteComment = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  const comment = topic.comments.id(req.params.cid);
  const vote = comment.votes.find((el) => el.user == req.user.id);
  if (!vote) {
    res.status(400);
    throw new Error("Not voted yet");
  }
  comment.votes.id(vote.id).remove();
  topic.save(function (err) {
    if (err) {
      res.status(400);
      throw new Error(err);
    }
  });
  res.status(200).json({ message: `Down voted comment: ${req.params.cid}` });
});

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  upVoteComment,
  downVoteComment,
};
