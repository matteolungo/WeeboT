const cron = require('cron');
const fetch = require('node-fetch');

const url = 'https://spring-bud-sockeye-coat.cyclic.app/'

const cronJob = new cron.CronJob('0 */25 * * * *', () => {

    fetch(url)
        .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
        .catch(err => console.error(`Error occured: ${err}`));

});

cronJob.start();