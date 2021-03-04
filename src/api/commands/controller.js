/* @flow */
import { Request, Response } from 'express';

import { definitions } from '../../../cypress/fixtures/definitions';

export const getCommandsController = () => async (
  req: Request,
  res: Response,
) => {
  try {
    res.status(200);
    return res.json({ data: definitions });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
