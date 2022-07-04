const asyncHandler = require('express-async-handler')

const Topic = require('../models/topicModel')

/*
    desc: Get Topic
    route: GET /api/topic
    access: Private
*/

const getTopics = asyncHandler( async (req,res) => {

    const topics = await Topic.find({ sort:{CreatedAt: -1} }).populate("user")
    res.status(200).json(topics)

})

/*
    desc: Get Topic
    route: GET /api/topic
    access: Private
*/

const getMyTopics = asyncHandler( async (req,res) => {

    const topics = await Topic.find({ user: req.user.id })
    res.status(200).json(topics)

})

/*
    desc: Get Topic
    route: GET /api/topic
    access: Private
*/

const getTopic = asyncHandler( async (req,res) => {

    const topic = await Topic.findById(req.params.id).populate("user")
    res.status(200).json(topic)
})

/*
    desc: Set Topic
    route: POST /api/topic/:id
    access: Private
*/

const setTopic = asyncHandler( async (req,res) => {
    if(!req.body.title[0]){
        res.status(400)
        throw new Error('Please add title field!')
    }
    if(!req.body.body[0]){
        res.status(400)
        throw new Error('Please add body field!')
    }


    const topic = await Topic.create({
        title: req.body.title[0],
        body: req.body.body[0],
        category: req.body.category[0],
        user: req.user.id,
    })

    res.status(200).json(topic)
})

/*
    desc: Update Topic
    route: PUT /api/topic/:id
    access: Private
*/
const updateTopic = asyncHandler( async (req,res) => {
    const topic = await Topic.findById(req.params.id)

    if(!topic){
        res.status(400)
        throw new Error('Topic not found')
    }

    const uTopic = {
        title: req.body.title[0],
        body: req.body.body[0],
        category: req.body.category[0], 
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
        req.params.id,uTopic,{ new: true}
    )

    res.status(200).json(updatedTopic)
})

/*
    desc: Delete Topic
    route: DELETE  /api/topic/:id
    access: Private
*/
const deleteTopic = asyncHandler( async (req,res) => {
    const topic = await Topic.findById(req.params.id)

    if(!topic){
        res.status(400)
        throw new Error('Topic not found')
    }

    await topic.remove()

    res.status(200).json({ id: req.params.id })
})


/*
    desc: Up Vote Topic
    route: PUT /api/topic/:id/up
    access: Private
*/
const upVoteTopic = asyncHandler(async (req, res) => {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      res.status(400);
      throw new Error("Topic not found");
    }
    
    if (topic.votes.find((el) => el.user == req.user.id)) {
      res.status(400);
      throw new Error("Already voted");
    }
    topic.votes.push({ user: req.user.id });
    topic.save(function (err) {
      if (err) {
        res.status(400);
        throw new Error(err);
      }
    });
    res.status(200).json({ message: `Up voted topic: ${req.params.id}` });
  });
  
  /*
      desc: Down Vote Topic
      route: PUT /api/topic/:id/:cid/down
      access: Private
  */
  const downVoteTopic = asyncHandler(async (req, res) => {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      res.status(400);
      throw new Error("Topic not found");
    }
    const vote = topic.votes.find((el) => el.user == req.user.id);
    if (!vote) {
      res.status(400);
      throw new Error("Not voted yet");
    }
    topic.votes.id(vote.id).remove();
    topic.save(function (err) {
      if (err) {
        res.status(400);
        throw new Error(err);
      }
    });
    res.status(200).json({ message: `Down voted Topic: ${req.params.id}` });
  });

  
module.exports = {
    getTopics,
    getMyTopics,
    getTopic,
    setTopic,
    updateTopic,
    deleteTopic,
    upVoteTopic,
    downVoteTopic,
}