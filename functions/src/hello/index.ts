const functions = require('firebase-functions');
const express = require('express');

const app = express();
const router = express.Router();

// @ts-ignore
router.get('/world', async (req, res, next) => {
  res.send({
    message: 'Hello, World!'
  });
});

app.use('/', router);

export const hello = functions
  .region('asia-northeast1')
  .runWith({ memory: '128MB',  timeoutSeconds: 2 })
  .https
  .onRequest(app);
