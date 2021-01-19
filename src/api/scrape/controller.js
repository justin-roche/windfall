import cypress from 'cypress';
/* @flow */
import {
  Request,
  Response,
} from 'express';
import fs from 'fs';

export const getScrapeController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    cypress.run({ browser: 'chrome', headed: true }).then((r) => {
      let rawdata = fs.readFileSync('./temp/scrape-results.json');
      let results = JSON.parse(rawdata);
      console.log('results in endpoint', results);
      return res.json({ data: { results, metadata: null } });
    });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
