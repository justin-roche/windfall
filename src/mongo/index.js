/* @flow */
import { MongoClient } from 'mongodb';
import {
  MongoConnectionType,
  MongoResultType,
} from 'types';

const useMongo = ({
  host,
  database,
  user,
  password,
  app,
}: MongoConnectionType): Promise<MongoResultType> =>
  MongoClient.connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: !user || !password ? null : { user, password },
  })
    .then((client) => {
      const db = client.db(database);

      const usersCollection = db.collection('users');

      const postsCollection = db.collection('posts');

      const commentsCollection = db.collection('comments');
      const resultsCollection = db.collection('results');

      const result: MongoResultType = {
        client,
        db,
      };

      if (app) {
        const { request } = app;

        Object.assign(request, {
          ...result,
          usersCollection,
          postsCollection,
          commentsCollection,
          resultsCollection,
        });
      }

      return result;
    })
    .catch((error) => {
      throw error;
    });

export default useMongo;
