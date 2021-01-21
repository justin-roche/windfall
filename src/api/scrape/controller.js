import cypress from 'cypress';
/* @flow */
import {
  Request,
  Response,
} from 'express';
import fs from 'fs';

import { genericError } from '../../models/result.model';

let mock = true;
function returnFile(res) {
  let rawdata = fs.readFileSync('./temp/scrape-results.json');
  let results = JSON.parse(rawdata);
  return res.json({ data: { results, metadata: null } });
}
export const getScrapeController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    if (mock === true) {
      returnFile(res);
    } else {
      // { browser: 'chrome', headed: true }
      cypress.run().then((r) => {
        returnFile(res);
      });
    }
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const postResultsController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    console.log('got post', req.data);
    const { ops } = req.resultsCollection.insertMany(req.body).then((r) => {
      req.resultsCollection
        .find()
        .toArray()
        .then((results) => {
          return res.json({ entire: results });
        });
    });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
