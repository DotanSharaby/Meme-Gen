'use strict';

var gNextId = 1;
var gImgs;
var gKeywords = { 'happy': 12, 'funny': 1, 'troll': 4, 'politics': 2, 'animel': 1, 'sleep': 1, 'baby': 3 };


function createImgs() {
    var imgs = [];

    imgs.push(createImage('https://i.imgur.com/zJtKrHF.jpg', ['troll', 'politics']),
        createImage('https://i.imgur.com/ertQX67.jpg', ['troll', 'politics']),
        createImage('https://i.imgur.com/uHCEW1F.jpg', ['animel', 'sleep', 'baby']),
        createImage('https://i.imgur.com/UVdxX82.jpg', ['funny', 'troll']),
        createImage('https://i.imgur.com/DX9HO5B.jpg', ['funny', 'baby']),
        createImage('https://i.imgur.com/oCzx3yZ.jpg', ['troll']),
        createImage('https://i.imgur.com/7K90eyW.jpg', ['metrix']),
        createImage('https://i.imgur.com/PfYcCNi.jpg', ['happy'])

    );

    gImgs = imgs;
    return imgs;
}

function createImage(url, keywords) {
    return {
        id: gNextId++,
        url: url,
        keywords: keywords
    };
}

function getImgs() {
    return gImgs;
}

function getMemeImg(memeImgIdx) {
    var img = gImgs.find((memeImg) => {
        return memeImg.id === memeImgIdx;
    })
    return img;
}