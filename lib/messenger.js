const request = require('request')
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN

exports.getUserProfile = function(PSID, callback) {
  const url = `https://graph.facebook.com/v2.6/${PSID}?fields=first_name,last_name,profile_pic&access_token=${FB_ACCESS_TOKEN}`
  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error)
      callback(error, null)
      return
    }
    console.log(body)
    callback(null, JSON.parse(body))
  })
}

exports.sendPersistentMenu = function (callback) {
  const url = `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${FB_ACCESS_TOKEN}`
  const option = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "persistent_menu":[
        {
          "locale":"default",
          "call_to_actions":[
            {
              "title":"👤 My Account",
              "type":"nested",
              "call_to_actions":[
                {
                  "title":"🍎 Airtime Balance",
                  "type":"postback",
                  "payload":"CHECK_AIRTIME_PAYLOAD"
                },
                {
                  "title":"🍎 Data Balance",
                  "type":"postback",
                  "payload":"CHECK_DATA_PAYLOAD"
                }
              ]
            },
            {
              "title":"👤 My Services",
              "type":"nested",
              "call_to_actions":[
                {
                  "title":"👉 Transfer money",
                  "type":"postback",
                  "payload":"TRANSFER_PAYLOAD"
                },
                {
                  "type":"postback",
                  "title":"👉 Buy data",
                  "payload":"BUY_DATA_PAYLOAD"                  
                },
              ]
            }
          ]
        }
      ]
    })
  }
  request(option, (error, response, body) => {
    if(error) {
      console.error(error)
      callback(error, null)
      return
    }
    console.log(response.statusCode, 'Persistent login set')
    console.log(body)
    callback(null, body)
  })
}

exports.sendPhoneNumberQuickReply = function (userId, callback) {
  const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_ACCESS_TOKEN}`
  const option = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "recipient":{
        "id": userId
      },
      "message":{
        "text": "I will need your phone number in order to check your balance, please enter your phone number",
        "quick_replies":[
          {
            "content_type":"user_phone_number",
            "payload":"POSTBACK_PHONE_NUMBER",
          }
        ]
      }
    })
  }
  request(option, (error, response, body) => {
    if (error) {
      console.error(error)
      callback(error, null)
      return
    }
    callback(null, body)
  })
}

exports.sendWelcomeText = function (userId, callback) {
  const url = `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${FB_ACCESS_TOKEN}`
  const option = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "greeting": [
        {
          "locale":"default",
          "text":"Hi {{user_first_name}}, I'm Mary, and I can help you check your airtime balance, buy data plan, transfer money and more 🙂." ,
        }
      ]
    })
  }
  request(option, (error, response, body) => {
    if (error) {
      console.error(error)
      callback(error, null)
      return
    }
    console.log(body, 'Welcome message')
    callback(null, body)
  })
}

exports.sendQuickMenuReplies = function (userId, callback) {
  const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_ACCESS_TOKEN}`
  const option = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "recipient":{
        "id": userId
      },
      "message":{
        "text": "What will you like to do?",
        "quick_replies":[
          {
            "content_type":"text",
            "title": "Airtime balance",
            "payload":"AIRTIME_BALANCE",
          },
          {
            "content_type":"text",
            "title": "Data balance",
            "payload":"DATA_BALANCE",
          },
          {
            "content_type":"text",
            "title": "Transfer Money",
            "payload":"TRANSFER_MONEY",
          },
          {
            "content_type":"text",
            "title": "Buy Data",
            "payload":"BUY_DATA",
          },
          {
            "content_type":"text",
            "title": "About LonestarMTN",
            "payload":"ABOUT_LONESTARMTN",
          },
        ]
      }
    })
  }
  request(option, (error, response, body) => {
    if (error) {
      console.error(error)
      callback(error, null)
      return
    }
    callback(null, body)
  })
}

exports.sendJustText = function (userId, profile, callback) {
  const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_ACCESS_TOKEN}`
  const option = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "recipient":{
        "id": userId
      },
      "message":{
        "text": `Hi ${profile.first_name}, I'm Mary, and I can help you check your airtime balance, buy data plan, transfer money and more 🙂.`,
      }
    })
  }

  request(option, (error, response, body) => {
    if (error) {
      console.error(error)
      callback(error, null)
      return
    }
    callback(null, body)
  })
}

