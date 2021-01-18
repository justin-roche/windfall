/* @flow */
import {
  Request,
  Response,
} from 'express';
import { genericError } from 'models/result.model';

export const getScrapeController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    return res.json({ data: { results: [1, 2], metadata: null } });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
