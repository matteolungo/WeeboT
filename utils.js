const axios = require('axios').default;
const querystring = require('querystring');

function getToken() {
    return new Promise(async (resolve, reject) => {
        axios.post("https://myanimelist.net/v1/oauth2/token", querystring.stringify({
            client_id: '46eb7aace1c390bf916bf6a9e9af0b70',
            client_secret: '90747327b9056d561c83f5e71890a63acd197bfd224115d15af77785c796d15d',
            grant_type: 'refresh_token',
            refresh_token: 'def50200314a291733837b7781e2b026dbf71d460692aa3d157c78edc764204bf31e2f9bec47e31c52b64eedeecf7ce0d5020286e4c3b6cd58b78155ccf7a604cb6350e33044308d54ea1f355c20a61d1cd5b6f742c8f5ce84451324f73f72d56de166b2651646d9e6c43583de02df5e0f8579a59573a9036287a53abd545bfce6abe498775fceb44b3be62d160cec7d4450dad4ef847f4d7e50c8c70028876e944cd9057eab48f7914c49b937b837d5f26a59ef2b153dc8dbaafe0ad1a0990ea0f1e0b950c8957f5ba3c0d8fdd187c2dbce786079c755797ae36cb416fd3314a03daf1f90134b3f5c4723fe39a754e26e1cc6f9f4ad153e48b05f6a9cda34fbed4e4557f185e61b56dc20bee27041aacc11e23d8bc79a7ee5ab65fa41a2d8cd6afcefcb1cb6bd1bd4ae733819a7952f6abbec443ce72bf21608ec7b9bfa3a52c8da755a9a4daf95b9ab0cc00afbacc42f3896684ca94d732b3769e7ed3fb1aee7e6a4711554c4d14a0ca07382ad2fca04d4375b9898a35f0f3c89c283d0f33a3dc50a47c2a0ce5352'
        })
        ).catch(e => console.log(e)).then(res => { resolve(res.data) });
    })
};

async function getAnime(query) {
    var token = await getToken();
    axios.get("https://api.myanimelist.net/v2/anime", {
        headers: {
            Authorization: 'Bearer ' + token.access_token
        },
        params: {
            q: query,
            limit: 1
        }
    }).catch(e => console.log(e)).then(response => {
        result = response.data.data[0].node;
        axios.get("https://api.myanimelist.net/v2/anime/" + result.id, {
            headers: {
                Authorization: 'Bearer ' + token.access_token
            },
            params: {
                fields: 'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics'
            }
        }).catch(e => console.log(e)).then(response => console.log(response.data))
    });
};

async function getManga(query) {
    var token = await getToken();
    axios.get("https://api.myanimelist.net/v2/manga", {
        headers: {
            Authorization: 'Bearer ' + token.access_token
        },
        params: {
            q: query,
            limit: 1
        }
    }).catch(e => console.log(e)).then(response => {
        result = response.data.data[0].node;
        axios.get("https://api.myanimelist.net/v2/manga/" + result.id, {
            headers: {
                Authorization: 'Bearer ' + token.access_token
            },
            params: {
                fields: 'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_volumes,num_chapters,authors{first_name,last_name},pictures,background,related_anime,related_manga,recommendations,serialization{name}'
            }
        }).catch(e => console.log(e)).then(response => console.log(response.data))
    });
}

module.exports = {getAnime, getManga};

