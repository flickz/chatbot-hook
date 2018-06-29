const request = require('request');
const fullFillmentTexts = require('./data/fullfillment_text');
const { WebhookClient } = require('dialogflow-fulfillment');

module.exports = (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res
  })
  const data = JSON.parse(fullFillmentTexts)
  const intent = agent.intent;
  const action = agent.action.toLocaleUpperCase();
  console.log(action)
  const parameters = agent.parameters;
  console.log(`INFO: User asked, ${intent} for ${JSON.stringify(parameters)}, ${action}`)
  agent.addResponse_(data['CHECK_CREDIT_BALANCE'].success)
}
