/* @flow */
import {
  Request,
  Response,
} from 'express';

import { genericError } from '../../models/result.model';

export const getDatabaseController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    req.savedCollection
      .find()
      .toArray()
      .then((results) => {
        return res.json({ data: { results, metadata: null } });
      });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const postDatabaseController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    const { ops } = req.savedCollection.insertMany(req.body).then((r) => {
      req.savedCollection
        .find()
        .toArray()
        .then((results) => {
          return res.json({ data: results });
        });
    });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
