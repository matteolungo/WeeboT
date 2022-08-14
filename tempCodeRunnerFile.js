bot.start((context) => {
//     context.reply("Benvenuto su WeeboT, usa i comandi /anime o /manga seguiti dal titolo dell'opera per avere vederne i dettagli")
// })

// bot.on('text', context => main(context))

// function main(context) {
//     if (context.update.message["chat"]["type"] === 'group' || context.update.message["chat"]["type"] === 'supergroup') {
//         if (context.update.message.text.split(' ')[0] === '/streaming') {
//             search = context.update.message.text.replace('/streaming', '')
//         } else {
//             return
//         }
//     } else {
//         search = context.update.message.text;
//     }
//     var sd_providers_list = new Object();
//     var sd_providers_list = {};
//     var hd_providers_list = new Object();
//     var hd_providers_list = {};

//     jw.search(search).then(data => research(data))

//     function research(data) {
//         try {
//             result = data["items"][0]["offers"];
//         } catch (error) {
//             if (error instanceof TypeError) {
//                 context.reply('❗️ Nessun titolo trovato. ❗️');
//                 return;
//             }
//         }

//         title = data["items"][0]["title"];
//         //result1 = data["items"][0];
//         //console.log(JSON.stringify(result, null, 4));

//         for (const i in result) {
//             if (result[i].monetization_type == 'flatrate' || result[i].monetization_type == 'ads' || result[i].monetization_type == 'free') {
//                 if (result[i].presentation_type == 'sd' && !sd_providers_list[result[i].provider_id]) {
//                     if (result[i].element_count) {
//                         sd_providers_list[result[i].provider_id] = result[i].element_count
//                     }
//                     else {
//                         sd_providers_list[result[i].provider_id] = 'null'
//                     }
//                 }
//                 else if (result[i].presentation_type == 'hd' && !hd_providers_list[result[i].provider_id]) {
//                     if (result[i].element_count) {
//                         hd_providers_list[result[i].provider_id] = result[i].element_count
//                     }
//                     else {
//                         hd_providers_list[result[i].provider_id] = 'null'
//                     }
//                 }
//             }
//         }

//         var reply = '';

//         for (i in sd_providers_list) {
//             elem = all_providers[i]
//             var seasons = ''
//             if (sd_providers_list[i] == 1) {
//                 seasons = ' (1 stagione)'
//             }
//             else if (sd_providers_list[i] != 'null') {
//                 seasons = ` (${sd_providers_list[i]} stagioni)`
//             }
//             reply = reply + '▫️ ' + elem + seasons + ' (SD'

//             if (hd_providers_list[i]) {
//                 delete hd_providers_list[i];
//                 reply = reply + ', HD)\n';
//             }
//             else {
//                 reply = reply + ')\n'
//             }
//         }

//         for (i in hd_providers_list) {
//             elem = all_providers[i]
//             var seasons = ''
//             if (hd_providers_list[i] == 1) {
//                 seasons = ' (1 stagione)'
//             }
//             else if (hd_providers_list[i] != 'null') {
//                 seasons = ` (${hd_providers_list[i]} stagioni)`
//             }
//             reply = reply + '▫️ ' + elem + seasons + ('(HD)\n')
//         }

//         if (reply != '') {
//             context.reply(`📺 Servizi di streaming per ${title}:\n\n${reply}`);
//         }
//         else {
//             context.reply(`❗️ Nessun servizio di streaming disponibile per: ${title}. ❗️`);
//         }
//     }
// }

// bot.launch()