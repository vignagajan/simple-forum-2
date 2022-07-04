/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

import { validate } from '../utilities/validationHelper';
import {
  fetchAllCommentSchema,
  fetchCommentSchema,
  addNewCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  
} from '../schema/commentSchema';


const fetchAllComment = async (id) => {
 

  const attributes = {
    id: id,
  };

  return true; //validate(fetchAllCommentSchema(), attributes);
};

// const fetchProduct = async (req: Request): Promise<any> => {
//   const cacheKey:string = encodeURIComponent(
//     `${req.url}-${JSON.stringify(req.query)}-${JSON.stringify(req.params)}`,
//   );

//   const attributes = {
//     cacheKey,
//     id: Number.isNaN(req.params.id) ? req.params.id : parseInt(req.params.id, 10), // id can be ID or slug
//   };

//   return validate(fetchCommentchema(), attributes);
// };

// const addNewProduct = async (req: Request): Promise<any> => {
//   const {
//     name, brand, image, unit, unit_price,
//   } = req.body;

//   if (!name || !brand) {
//     const Err:any = new Error('Passing falsy values for required fields');
//     Err.code = 400;

//     throw Err;
//   }

//   const attributes = {
//     name,
//     slug: slugify(`${name} ${Math.floor(Math.random() * 1000)}`),
//     sku: `${name.slice(0, 2)}-${Math.floor(
//       Math.random() * 899 + 100,
//     )}-${brand.slice(0, 2)}`,
//     brand,
//     image,
//     unit,
//     unit_price,
//   };

//   return validate(addNewCommentchema(), attributes);
// };

// const updateProduct = async (req: Request): Promise<any> => {
//   const {
//     name, slug, sku, image, unit, unit_price,
//   } = req.body;

//   const attributes = {
//     id: parseInt(req.params.id, 10),
//     name,
//     slug,
//     sku,
//     image,
//     unit,
//     unit_price,
//   };

//   return validate(updateCommentchema(), attributes);
// };

// const deleteProduct = async (req: Request): Promise<any> => {
//   const attributes = {
//     id: parseInt(req.params.id, 10),
//   };

//   return validate(deleteCommentchema(), attributes);
// };

// const csvUpload = async (req: Request): Promise<any> => {
//   const CommentCSV = await csvFileToJSON(req.file.path);

//   // Convert CSV Array to Product JSON Array
//   /**
//    * ===================== Product CSV JSON ======================
//    * "Comment": [
//       [
//         "name",
//         "brand",
//         "slug",
//         "unit",
//         "sku",
//         "unit_price"
//       ],
//       [
//         "Chiffon spaghetti dress long true blue",
//         "Ivy & Oak",
//         "chiffon-spaghetti-dress-long-true-blue",
//         "pcs",
//         "Ch-97-Iv",
//         "199"
//       ],
//       ......
//     ]
//    *
//    * ================ Expected JSON =============================
//    * "Comment": [
//       {
//         "name": "Chiffon spaghetti dress long true blue",
//         "brand": "Ivy & Oak",
//         "slug": "chiffon-spaghetti-dress-long-true-blue",
//         "unit": "pcs",
//         "sku": "Ch-97-Iv",
//         "unit_price": "199"
//       },
//       {
//         "name": "Chiffon spaghetti dress long yellow",
//         "brand": "Ivy & Oak",
//         "slug": "chiffon-spaghetti-dress-long-yellow",
//         "unit": "pcs",
//         "sku": "Ch-671-Iv",
//         "unit_price": "169"
//       },
//       ...
//     ]
//    */

//   let attributeIndex:any = {}; // Object to hold the column index of each attribute in CSV
//   const Comment = CommentCSV.reduce((productArray: any, rowArray: any, index: number) => {
//     let product = {};
//     if (index === 0) {
//       // first row - header row
//       rowArray.forEach((headerCell: any, headerIndex: number) => {
//         attributeIndex = {
//           ...attributeIndex,
//           [headerIndex]: headerCell,
//         };
//       });

//       return productArray;
//     }
//     // data rows
//     product = rowArray.reduce(
//       (productObj: any, rowCell: any, rowIndex: number) => ({
//         ...productObj,
//         [attributeIndex[rowIndex]]:
//           attributeIndex[rowIndex] === 'unit_price'
//             ? parseInt(rowCell, 10)
//             : rowCell, // unit price should be number
//       }),
//       {},
//     );

//     return [...productArray, product];
//   }, []);

//   const attributes = {
//     fileType: req.file.mimetype,
//     fileSize: req.file.size,
//     Comment,
//   };

//   return validate(csvUploadSchema(), attributes);
// };

export default {
  fetchAllComment,
//   fetchProduct,
//   addNewProduct,
//   updateProduct,
//   deleteProduct,
//   csvUpload,
};