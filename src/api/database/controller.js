import { genericError } from '../../models/result.model';

export function saveScrapeResults(req, data) {
  let ids = data.map((item) => item._id);
  req.savedCollection.remove({ _id: { $in: ids } }).then(() => {
    req.savedCollection.insertMany(data);
  });
}

export const getDatabaseController = () => async (req, res) => {
  try {
    req.savedCollection
      .find()
      .toArray()
      .then((results) => {
        return res.json({ data: { results, metadata: null } });
      });
  } catch (error) {
    return res.json(genericError({ message: error.message }));
  }
};

export const postDatabaseController = () => async (req, res) => {
  try {
    const { ops } = req.savedCollection.insertMany(req.body).then((r) => {
      req.savedCollection
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
