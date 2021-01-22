import cypress from 'cypress';
/* @flow */
import {
  Request,
  Response,
} from 'express';

import { genericError } from '../../models/result.model';

export const executeScrapeController = () => async (
  req: Request,
  res: Response,
) => {
  console.log('executing...');
  try {
    cypress.run().then((r) => {
      req.resultsCollection
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
