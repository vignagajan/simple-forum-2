import Joi from 'joi';

const fetchAllCommentSchema = Joi.object().keys({
  user: Joi.number(),
  comment: Joi.string(),
  votes: Joi.string(),
});

const fetchCommentSchema = Joi.object().keys({
  _id: Joi.required(),
});

const addNewCommentSchema = Joi.object().keys({
  user: Joi.number().min(3).max(100).required(),
  comment: Joi.string().min(3).max(100).required(),
  votes: Joi.string().min(8).max(12).required(),
  
});

const updateCommentSchema = Joi.object().keys({
  _id: Joi.number().required(),
  name: Joi.string().min(3).max(100),
  slug: Joi.string().min(3).max(100),
  sku: Joi.string()
    .min(8)
    .max(12)
    .pattern(new RegExp(/^[a-z]{2}-[\d]{3}-[a-z]{2}$/i)),
  image: Joi.string().allow(null, '').max(1000),
  unit: Joi.string().allow(null, '').max(20),
  unit_price: Joi.number().allow(null, ''),
});

const deleteCommentSchema = Joi.object().keys({
  _id: Joi.number().required(),
});




export {
  fetchAllCommentSchema,
  fetchCommentSchema,
  addNewCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
};