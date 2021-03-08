import { genericError } from '../../models/result.model';

export const getResultsController = () => async (req, res) => {
  try {
    let results = await req.resultsCollection.find().toArray();
    return res.json({ data: results });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const deleteResultsController = () => async (req, res) => {
  try {
    let results = await req.resultsCollection.deleteMany({});
    return res.json({ data: results });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};
