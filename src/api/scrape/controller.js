import cypress from 'cypress';
/* @flow */
import {
  Request,
  Response,
} from 'express';
import fs from 'fs';

import { genericError } from '../../models/result.model';

function returnFile(res) {
  let rawdata = fs.readFileSync('./temp/scrape-results.json');
  let results = JSON.parse(rawdata);
  return res.json({ data: { results, metadata: null } });
}
export const performScrapeController = () => async (
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

export const getScrapeController = () => async (
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
export const postResultsController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    const { ops } = req.resultsCollection.insertMany(req.body).then((r) => {
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
