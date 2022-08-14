// keepAlive.js

const cron = require('cron');
const fetch = require('node-fetch');

// globals
const url = 'https://weebot-app.herokuapp.com/'

const cronJob = new cron.CronJob('0 */25 * * * *', () => {

    fetch(url)
        .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
        .catch(err => console.error(`Error occured: ${err}`));

});

cronJob.start();