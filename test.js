const fullFillmentTexts = require('./controllers/data/fullfillment_text');

try {
  // const data = JSON.parse(fullFillmentTexts)
  console.log(fullFillmentTexts['CHECK_CREDIT_BALANCE'].success)
} catch (err) {
  console.error(err)
}
