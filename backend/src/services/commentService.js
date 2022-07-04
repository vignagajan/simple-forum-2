/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// import { Op } from 'sequelize';
const asyncHandler = require("express-async-handler");

const Topic = require("../models/topicModel");



const fetchAllComments = async (id) => {
  // const {
  //   cacheKey, page, limit, sortBy,
  // }: {cacheKey: string, page: number, limit: number, sortBy: string} = attributes;

  // // prepare conditions
  // const options: any = {};
  // if (limit) {
  //   options.offset = page ? (page - 1) * limit : 0;
  //   options.limit = limit;
  // }

  // if (sortBy) {
  //   options.order = [[sortBy, 'ASC']];
  // }

  // // fetch list of Comments
  // const Comments = await Comments.findAll(options);

  // return {
  //   Comments,
  //   cacheKey,
  // };

  const topic = await Topic.findById(id).populate("user");

  return topic
};

// const fetchComment = async (attributes: any): Promise<any> => {
//   const { cacheKey, id } = attributes;

//   // fetch list of Comments
//   const Comments = await Comments.findAll({
//     where: {
//       [Op.or]: [{ id }, { slug: id }],
//     },
//   });

//   return {
//     Comments,
//     cacheKey,
//   };
// };

// const addNewComment = async (attributes: any): Promise<any> => {
//   const {
//     name, slug, sku, brand, image, unit, unit_price,
//   } = attributes;

//   // Create or Fetch Brand ID
//   const [brandRecord, created] = await Brands.findOrCreate({
//     where: { name: brand },
//   });

//   // fetch list of Comments
//   const newComment = await Comments.create({
//     name,
//     brand: brandRecord.get('id'),
//     slug,
//     sku,
//     image,
//     unit,
//     unit_price,
//   });

//   return {
//     ...newComment.toJSON(),
//     flushCache: true,
//   };
// };

// const updateComment = async (attributes: any): Promise<any> => {
//   const { id } = attributes;

//   // check whether Comment with it exist
//   await checkRecordExistByAttribute(Comments, { id });

//   // Omit the null fields from attribute
//   const validUpdateAttributes = Object.keys(attributes)
//     .filter((key) => attributes[key] && key !== 'id')
//     .reduce(
//       (obj, validKey) => ({
//         ...obj,
//         [validKey]: attributes[validKey],
//       }),
//       {},
//     );

//   // Update Comment
//   await Comments.update(
//     { ...validUpdateAttributes, updatedAt: Date.now() },
//     {
//       where: {
//         id,
//       },
//     },
//   );

//   return {
//     id,
//     ...validUpdateAttributes,
//     flushCache: true,
//   };
// };

// const deleteComment = async (attributes: any): Promise<any> => {
//   const { id } = attributes;

//   // check whether Comment with it exist
//   await checkRecordExistByAttribute(Comments, { id });

//   // Update Comment
//   await Comments.destroy({
//     where: {
//       id,
//     },
//   });

//   return {
//     id,
//     flushCache: true,
//   };
// };

// const csvUpload = async (attributes: any): Promise<any> => {
//   const { Comments } = attributes;

//   for (let i = 0; i < Comments.length; i++) {
//     // cannot use promise.all since it will create duplicate data while executing in parallel
//     const [brandRecord, created] = await Brands.findOrCreate({
//       where: { name: Comments[i].brand },
//     });

//     Comments[i] = {
//       ...Comments[i],
//       brand: brandRecord.get('id'),
//     };
//   }

//   const result = await Comments.bulkCreate(Comments);

//   return {
//     result,
//     flushCache: true,
//   };
// };

export default {
  fetchAllComments,
  // fetchComment,
  // addNewComment,
  // updateComment,
  // deleteComment,
  // csvUpload,
};