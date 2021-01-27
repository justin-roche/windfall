/* @flow */
import {
  Request,
  Response,
} from 'express';

import { genericError } from '../../models/result.model';

export const getResultsController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    req.resultsCollection
      .find()
      .toArray()
      .then((results) => {
        return res.json({ data: results });
      });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const deleteResultsController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    req.resultsCollection.deleteMany({}).then((results) => {
      return res.json({ data: results });
    });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
// export const executeScrapeController = () => async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     // browser: 'chrome',
//     cypress
//       .run({
//         env: { commands: { a: 1 } },
//         headless: false,
//         quiet: false,
//       })
//       .then((r) => {
//         req.resultsCollection
//           .find()
//           .toArray()
//           .then((results) => {
//             return res.json({ data: results });
//           });
//       });
//   } catch (error) {
//     return res.json(genericError({ message: error.message }));
//   }
// };
