import cypress from 'cypress';
/* @flow */
import {
  Request,
  Response,
} from 'express';

import { commands } from '../../../cypress/fixtures/commands';
import { genericError } from '../../models/result.model';

export const executeScrapeController = () => async (
  req: Request,
  res: Response,
) => {
  console.log('executing...');
  try {
    // headless: false,
    // browser: 'chrome',
    // headless: false,
    cypress
      .run({
        env: { commands },
        quiet: false,
      })
      .then((r) => {
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
