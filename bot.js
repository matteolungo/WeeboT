const { Telegraf } = require('telegraf');
const bot = new Telegraf('5731190548:AAHWWNeyKz67muLQ53WcD8GkGu5FashgJ9U');
const utils = require('./utils.js')
const translate = require('translate-google')

bot.start((context) => {
    context.reply("Benvenuto su WeeboT, usa i comandi /anime o /manga seguiti dal titolo dell'opera per conoscerne i dettagli")
})

bot.on('text', context => main(context))

async function main(context) {
    var flag;
    if (context.update.message.text.split(' ')[0] === '/anime') {
        search = context.update.message.text.replace('/anime ', '');
        flag = 'anime';
    } else if (context.update.message.text.split(' ')[0] === '/manga') {
        search = context.update.message.text.replace('/manga ', '')
        flag = 'manga';
    } else {
        return
    }

    var result;
    if (flag === 'anime') {
        result = await utils.getAnime(search);
        var pic_url = result.main_picture.large;
        var title = result.title;
        var original_title = result.alternative_titles.ja;
        var start_date = formatDate(result.start_date);
        var end_date = formatDate(result.end_date);
        if (result.start_season) {
            var start_season = result.start_season.season.replace('fall', 'Autunno').replace('spring', 'Primavera').replace('summer', 'Estate').replace('winter', 'Inverno') + ' ' + result.start_season.year;
        } else {
            var start_season = "-"
        }
        var grade = result.mean !== undefined ? result.mean : "-";
        var media_type = await translate(result.media_type, { to: 'it' });
        var status = result.status.replace('finished_airing', 'Concluso').replace('currently_airing', 'In Corso').replace('not_yet_aired', 'Non ancora trasmesso');
        var genres = await translate(result.genres.map(i => i.name).join(', '), { to: 'it' });
        var num_episodes = result.num_episodes;
        var avg_episode_duration = Math.floor(result.average_episode_duration / 60) !== 0 ? Math.floor(result.average_episode_duration / 60) : null;
        var episodes = avg_episode_duration ? num_episodes + ' (~' + avg_episode_duration + ' min.)' : num_episodes;
        var studios = result.studios.map(i => i.name).join(', ');
        var mal_link = 'https://myanimelist.net/anime/' + result.id;
        if (result.synopsis)
            var synopsis = await translate(result.synopsis.replace('[Written by MAL Rewrite]', ''), { to: 'it' });
        var desc = '<b>Titolo: </b>' + title + ' (' + original_title + ')\n<b>Data Uscita: </b>' + start_season +
            '\n<b>Voto: </b>' + grade + '\n<b>Tipo: </b>' + media_type.charAt(0).toUpperCase() + media_type.slice(1) + '\n<b>Stato: </b>' + status +
            '\n<b>Genere: </b>' + genres.replace(/(^\w|\s\w)/g, m => m.toUpperCase()).replace('Cast Per Adulti', 'Cast Adulto') +
            '\n<b>Episodi: </b>' + episodes + '\n<b>Studio: </b>' + studios + '\n\n<b><a href="' + mal_link + '">Link MAL</a></b>';
        context.replyWithPhoto({ url: pic_url }, { caption: desc, parse_mode: 'HTML' }).then(() => {
            if (synopsis) {
                context.reply(synopsis.substring(0, 500) + '[...]');
            }
        });
    } else if (flag === 'manga') {
        result = await utils.getManga(search);
        var pic_url = result.main_picture.large;
        var title = result.title;
        var original_title = result.alternative_titles.ja;
        var start_date = formatDate(result.start_date);
        var grade = result.mean !== undefined ? result.mean : "-";
        var media_type = result.media_type;
        var status = result.status.replace('finished', 'Concluso').replace('currently_publishing', 'In Corso').replace('not_yet_published', 'Non ancora pubblicato').replace('on_hiatus', 'In pausa').replace('discontinued', 'Interrotto');
        var genres = await translate(result.genres.map(i => i.name).join(', '), { to: 'it' });
        var authors = result.authors.map(i => i.node.first_name + ' ' + i.node.last_name).join(', ');
        var num_volumes = result.num_volumes !== 0 ? result.num_volumes : "-"
        var mal_link = 'https://myanimelist.net/manga/' + result.id;
        if (result.synopsis)
            var synopsis = await translate(result.synopsis.replace('[Written by MAL Rewrite]', ''), { to: 'it' });
        var desc = '<b>Titolo: </b>' + title + ' (' + original_title + ')\n<b>Data Uscita: </b>' + start_date +
            '\n<b>Voto: </b>' + grade + '\n<b>Tipo: </b>' + media_type.charAt(0).toUpperCase() + media_type.slice(1) + '\n<b>Stato: </b>' + status +
            '\n<b>Genere: </b>' + genres.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) +
            '\n<b>Volumi: </b>' + num_volumes + '\n<b>Autori: </b>' + authors + '\n\n<b><a href="' + mal_link + '">Link MAL</a></b>';
        context.replyWithPhoto({ url: pic_url }, { caption: desc, parse_mode: 'HTML' }).then(() => {
            if (synopsis) {
                context.reply(synopsis.substring(0, 500) + '[...]');
            }
        });
    } else {
        context.reply('Nessun risultato trovato.');
    }
}

function formatDate(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
}

bot.launch()
