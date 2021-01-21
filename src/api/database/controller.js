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
    req.resultsCollection
      .find()
      .toArray()
      .then((results) => {
        return res.json({ data: { results, metadata: null } });
      });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
