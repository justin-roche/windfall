import cypress from 'cypress';
/* @flow */
import {
  Request,
  Response,
} from 'express';
import fs from 'fs';

// let mock = true;
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
