import { definitions } from '../../../cypress/fixtures/definitions';
import { genericError } from '../../models/result.model';

export const getDefinitionsController = () => async (req, res) => {
  try {
    res.status(200);
    return res.json({ data: definitions });
  } catch (error) {
    return res.json(genericErrorror({ message: error.message }));
  }
};
