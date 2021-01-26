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
