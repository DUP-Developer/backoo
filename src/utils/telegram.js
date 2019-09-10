const TelegramBot = require(`node-telegram-bot-api`)
const TOKEN = `760525513:AAGOKxs06h5xHSlLYe-gtsCFjBl09lH5iDM`
const bot = new TelegramBot(TOKEN, {
  polling: true
})

let chatId = 615145071
let ctx

export default {
  start() {
    bot.on('message', function (msg) {
      chatId = msg.chat.id
      console.log(msg.chat.id);
      
      return msg
    })

    bot.on('polling_error', (error) => {
      console.log(error); // => 'EFATAL'
    });
  },

  send(message) {
    bot.sendMessage(chatId, message)
  }
}