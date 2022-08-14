const { Telegraf } = require('telegraf');
const bot = new Telegraf('');
const utils = require('./utils.js')

bot.start((context) => {
    context.reply("Benvenuto su WeeboT, usa i comandi /anime o /manga seguiti dal titolo dell'opera per avere vederne i dettagli")
})

bot.on('text', context => main(context))

async function main(context) {
    if (context.update.message["chat"]["type"] === 'group' || context.update.message["chat"]["type"] === 'supergroup') {
        var flag;
        if (context.update.message.text.split(' ')[0] === '/anime') {
            search = context.update.message.text.replace('/anime', '');
            flag = 'anime';
        } else if (context.update.message.text.split(' ')[0] === '/manga') {
            search = context.update.message.text.replace('/manga', '')
            flag = 'manga';
        } else {
            return
        }

        if (flag === 'anime') {
            const result = await utils.getAnime(search);
        } else if (flag === 'manga') {
            const result = await utils.getManga(search);
        }

        if (result) {
            context.reply(result);
        }
    } else {
        search = context.update.message.text;
    }

}

bot.launch()