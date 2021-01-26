/* @flow */
import {
  Request,
  Response,
} from 'express';

import { commands } from '../../../cypress/fixtures/commands';

export const getCommandsController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    res.status(200);
    return res.json({ data: commands });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
