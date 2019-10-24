'use strict';

var gCanvas;
var gCtx;

function onInit() {
    var imgs = createImgs();
    renderImgs(imgs);
}

function initMemeEditor(imgId) {

    toggleView();
    createMeme(imgId);
    initCanvas();
    renderTxtEditor();
}

function renderImgs(imgs) {
    var strHtml = imgs.map(function (img) {
        return `
        <img id='${img.id}' src='${img.url}' onclick="initMemeEditor(${img.id})" alt='meme picture'/>
        `
    })
        .join(' ')
    document.querySelector('.gallery').innerHTML = strHtml;
}

function initCanvas() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    renderCanvas();
};

function renderCanvas() {
    var meme = getMeme();
    handleMemeImg(meme);
}

function handleMemeImg(meme) {
    var imgObj = getMemeImg(meme.selectedImgId);
    var img = new Image;
    img.src = imgObj.url;

    img.onload = () => {
        if (img.width > 500) img.width = 500;
        if (img.height > 500) img.height = 500;
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        if(meme.txts[1]) meme.txts[1].y = img.height - 70;
        // meme.txts[1].y = img.height - 70;
        drawCanvas(img);
    }
}

function drawCanvas(img) {
    gCtx.drawImage(img, 0, 0);
    var meme = getMeme();

    meme.txts.forEach(function (txt) {
        drawTxt(txt);
    });
}

function drawTxt(txt) {
    gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    if (txt.isShadow) addTxtShadow(txt);
    if (txt.isOutline) addTxtOutline(txt);

    gCtx.fillText(txt.line, txt.x, txt.y);
}

function addTxtShadow(txt) {
    gCtx.shadowColor = txt.shadowColor;
    gCtx.shadowOffsetX = txt.shadowOffsetX;
    gCtx.shadowOffsetY = txt.shadowOffsetY;
    gCtx.shadowBlur = txt.shadowBlur;
}

function addTxtOutline(txt) {
    gCtx.strokeStyle = txt.strokeStyle;
    gCtx.lineWidth = txt.lineWidth;
    gCtx.strokeText(txt.line, txt.x, txt.y);
}

function toggleView() {
    document.querySelector('.meme-container').classList.toggle('hidden');
    document.querySelector('.gallery').classList.toggle('hidden');
}


function renderTxtEditor() {
    var meme = getMeme();
    var strHtml = meme.txts.map(function (txt, idx) {
        return `
        <div class="txt-editor">
            <div>
                <button onclick="deleteTxt(${idx})">X</button>
                <input type="text" data-property="line" placeholder="${txt.line}" oninput="editTxt(this,${idx})">
                <input type="range" value="${txt.size}" min="10" step="2" data-property="size" oninput="editTxt(this,${idx})">
                <input type="color" value="${txt.color}" data-property="color" oninput="editTxt(this,${idx})">
                <label for="font">Font:</label>
                <select data-property="fontFamily" oninput="editTxt(this,${idx})">
                    <option value="${txt.fontFamily}">${txt.fontFamily}</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>
            <div>
                <input type="number" value="${txt.x}" min="0" step="5" data-property="x" oninput="editTxt(this,${idx})">
                <input type="number" value="${txt.y}" min="0" step="5" data-property="y" oninput="editTxt(this,${idx})">
                <select data-property="align" oninput="editTxt(this,${idx})">
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                </select>
            </div>
            <div>
                <label for="outline">Outline Width:</label>
                <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this,${idx})">
                <input type="number" value="${txt.lineWidth}" min="0" step="1" data-property="lineWidth" oninput="editTxt(this,${idx})">
                <input type="color" value="${txt.strokeStyle}" data-property="strokeStyle" oninput="editTxt(this,${idx})">
            </div>
            <div>
                <input id="shadow" type="checkbox" data-property="isShadow" onclick="editTxt(this,${idx})">
                <label for="shadow">Shadow:</label>
                <input type="color" value="${txt.shadowColor}" data-property="shadowColor" oninput="editTxt(this,${idx})">
                <input type="number" value="${txt.shadowOffsetX}" step="1" data-property="shadowOffsetX" oninput="editTxt(this,${idx})">
                <input type="number" value="${txt.shadowOffsetY}" step="1" data-property="shadowOffsetY" oninput="editTxt(this,${idx})">
                <label for="blur">Blur:</label>
                <input type="number" value="${txt.shadowBlur}" data-property="shadowBlur" oninput="editTxt(this,${idx})">
            </div>
        </div>
    `
    })
        .join(' ');
    document.querySelector('.txts-list').innerHTML = strHtml;
}

// check when and why both lines are getting changed
function editTxt(elinput, txtIdx) {
    var property = elinput.dataset.property;
    var value;

    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value;
            break;
        case 'checkbox':
            value = elinput.checked;
            break;
        default:
            value = elinput.value;
            break;
    }
    gMeme.txts[txtIdx][property] = value;
    handleMemeImg(gMeme);
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}