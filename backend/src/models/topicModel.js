const mongoose = require('mongoose')

const voteSchema = mongoose.Schema(
    { 
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true,'Please add a user'],
            ref: 'User'
        }
        }
        ,
        {
            timestamps: true,
        } 
);

const commentSchema = mongoose.Schema(
    { 
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true,'Please add a user'],
            ref: 'User'
        },
        comment:{
            type: String,
            ref:'Comment'
        },
        votes:[voteSchema]
        }
        ,
        {
            timestamps: true,
        } 
);

const topicSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: [true,'Please add a topic title']
        },
        body:{
            type: String,
            required: [true,'Please add a topic body']
        },
        category:{
            type: String,
            required: [true,'Please add a topic category']
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true,'Please add a user'],
            ref: 'User'
        },
        comments: [commentSchema],
        votes: [voteSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Topic',topicSchema)