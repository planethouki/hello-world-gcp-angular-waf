const functions = require('firebase-functions');
const express = require('express');

const app = express();
const router = express.Router();

// @ts-ignore
router.get('/bar', async (req, res, next) => {
  res.send({
    message: 'foo, bar!'
  });
});

app.use('/', router);

export const foo = functions
  .region('asia-northeast1')
  .runWith({ memory: '128MB',  timeoutSeconds: 2 })
  .https
  .onRequest(app);
