const { getUserProfile, sendPersistentMenu, sendPhoneNumberQuickReply, sendWelcomeText, sendQuickMenuReplies, sendJustText } = require('../lib/messenger')
const fullFillmentTexts = require('./data/fullfillment_text');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');

module.exports = (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res
  })
  const data = fullFillmentTexts
  const intent = agent.intent;
  const action = agent.action;
  const payload = agent.originalRequest.payload
  const userPSID = payload.data.sender.id
  
  const handleUserProfile = function (error, profile) {
    if(error) console.log(error);
    const firstName = profile.first_name
    sendJustText(userPSID, profile, (error, result) => {
      if(error) {
        return
      }
      console.log('Sent Welcome text')
      sendQuickMenuReplies(userPSID, (error, result) => {
        if(error) {
          return
        }
        console.log('Quick reply')
        agent.send_()
      })
    })
  }
  const handleCallbacks = function (error, result) {
    if(error) {
      return
    }
    getUserProfile(userPSID, handleUserProfile)
  }
  if (action === 'get_started') {
    sendPersistentMenu(handleCallbacks)
  }

  if (action === 'check_balance') {
    // agent.add('I will need to your phone number in order to check your balance, please enter your phone number')
    sendPhoneNumberQuickReply(userPSID, (error, result) => {
      if (error) {
        console.log(error)
        agent.send_()
        return
      }
      console.log(result)
      agent.send_()
    })
  }
}
