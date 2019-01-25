const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const port = process.env.PORT || 3000;

let app = express();
let images = "";
app.use(express.static(__dirname + '/public'));

// ID = cd2346e46dd2bdc
// Secret = 05c56c06524d66be104fa1e9e422c86c72c935e6 
let clientId = 'cd2346e46dd2bdc';

app.get('/', async (req, res) => {
    await axios({
        method: 'get',
        url: 'https://api.imgur.com/3/album/itw8iMo/images',
        headers: { 'authorization': 'Client-ID ' + clientId }
    }).then((res) => {
        images += `<div class="left">`;
        for (let i = 0; i < res.data.data.length; i+=2) {
            let src = res.data.data[i].link;
            images += `<img src="${src}">`;
        }
        images += `</div>`;
        images += `<div class="right">`;
        for (let i = 1; i < res.data.data.length; i+=2) {
            let src = res.data.data[i].link;
            images += `<img src="${src}">`;
        }
        images += `</div>`;
        }).catch((err) => {
            console.log(err);
    });
    res.render('home.hbs', {images});
    images = "";
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('*', (req, res) => {
    res.render('home.hbs');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});