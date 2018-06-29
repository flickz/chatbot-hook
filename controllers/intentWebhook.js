const request = require('request');
const fullFillmentTexts = require('./data/fullfillment_text');
const { WebhookClient } = require('dialogflow-fulfillment');

module.exports = (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res
  })
  const intent = agent.intent;
  const action = agent.action.toLocaleUpperCase();
  const parameters = agent.parameters;
  console.log(`INFO: User asked, ${intent} for ${parameters}`)
  agent.addResponse_(fullFillmentTexts[action].success)
}
