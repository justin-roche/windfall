import { resultModel } from 'models/result.model';

export const meController = () => async (req, res) => {
  const { user } = req;

  return res.json(resultModel({ data: user }));
};
