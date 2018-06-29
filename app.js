require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan')
const verificationController = require('./controllers/verification')
const messageWebhookController = require('./controllers/messageWebhook')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'))

app.get('/', verificationController);
app.post('/', messageWebhookController);

app.listen(3000 || process.env.PORT, () => console.log(`Webhook server is listening..`));