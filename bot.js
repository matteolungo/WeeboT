const { Telegraf } = require('telegraf');
const bot = new Telegraf('5731190548:AAHWWNeyKz67muLQ53WcD8GkGu5FashgJ9U');
const utils = require('./utils.js')

bot.start((context) => {
    context.reply("Benvenuto su WeeboT, usa i comandi /anime o /manga seguiti dal titolo dell'opera per conoscerne i dettagli")
})

bot.on('text', context => main(context))

async function main(context) {
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

    var result;
    if (flag === 'anime') {
        result = await utils.getAnime(search);
    } else if (flag === 'manga') {
        result = await utils.getManga(search);
    }

    if (result) {
        context.reply(JSON.stringify(result));
    }
}

bot.launch()
