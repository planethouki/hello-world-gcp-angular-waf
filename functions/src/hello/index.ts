const functions = require('firebase-functions');
const express = require('express');

const app = express();
const router = express.Router();

// @ts-ignore
app.use((req, res, next) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (!forwardedFor) {
    res.status(403).send('Forbidden');
    return;
  }

  if (forwardedFor.split(',').some((ip: string) => ip.trim() === '34.54.110.179')) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
});

// @ts-ignore
router.get('/world', async (req, res, next) => {
  console.log(req.headers);
  console.log(req.socket.remoteAddress);
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
