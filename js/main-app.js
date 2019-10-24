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
        .join(' ');
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
        img.width = 500;
        img.height = 500;
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        if (meme.txts[1]) meme.txts[1].y = img.height - 70;
        drawImgOnCanvas(img);
    }
}

function drawImgOnCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    var meme = getMeme();
    meme.txts.forEach((txt) => drawTxt(txt));
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
    var txt = meme.txts[0];
    var strHtml = `
        <div class="txt-editor">
            <div>
                <input type="text" data-property="line" placeholder="${txt.line}" oninput="editTxt(this)">
            </div>
            <div>
                <button onclick="deleteTxt()">
                    <img class="icons trash-icon" src="./icons/trash.png"/>
                </button>
                <button onclick="addTextLine()">
                    <img class="icons txt-swap-icon" src="./icons/add.png"/>
                </button>
                <button onclick="changeSelectedTxtIdx()">
                    <img class="icons txt-swap-icon" src="./icons/up-and-down-opposite-double-arrows-side-by-side.png"/>
                </button>
            </div>
            <div>
                <select data-property="fontFamily" oninput="editTxt(this)">
                    <option value="${txt.fontFamily}">${txt.fontFamily}</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Verdana">Verdana</option>
                </select>
                <button onclick="editTxtSize(this,-1)">
                    <img class="icons txt-size-icon" src="./icons/decrease font - icon.png"/>
                </button>
                <button onclick="editTxtSize(this,1)">
                    <img class="icons txt-size-icon" src="./icons/increase font - icon.png"/>
                </button>

                <button style="position:relative; display:inline-block">
                    <img class="icons txt-size-icon" src="./icons/paint-board-and-brush.png"/>
                    <input class="color-input" type="color" value="${txt.color}" data-property="color" oninput="editTxt(this)"/>
                </button>
            </div>
            <div>
                <input type="number" value="${txt.x}" min="0" step="5" data-property="x" oninput="editTxt(this)">
                <input type="number" value="${txt.y}" min="0" step="5" data-property="y" oninput="editTxt(this)">

                <button onclick="editTxt(this)" data-property="align">
                    <img class="icons txt-align-icon" src="./icons/align-to-left.png" data-value="right"/>
                </button>
                <button onclick="editTxt(this)" data-property="align">
                    <img class="icons txt-align-icon" src="./icons/center-text-alignment.png" data-value="center"/>
                </button>
                <button onclick="editTxt(this)" data-property="align">
                    <img class="icons txt-align-icon" src="./icons/align-to-right.png" data-value="left"/>
                </button>

            </div>
            <div>
                <label for="outline">Outline Width:</label>
                <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this)">
                <input type="number" value="${txt.lineWidth}" min="0" step="1" data-property="lineWidth" oninput="editTxt(this)">
                <input type="color" value="${txt.strokeStyle}" data-property="strokeStyle" oninput="editTxt(this)">
            </div>
            <div>
                <input id="shadow" type="checkbox" data-property="isShadow" onclick="editTxt(this)">
                <label for="shadow">Shadow:</label>
                <input type="color" value="${txt.shadowColor}" data-property="shadowColor" oninput="editTxt(this)">
                <input type="number" value="${txt.shadowOffsetX}" step="1" data-property="shadowOffsetX" oninput="editTxt(this)">
                <input type="number" value="${txt.shadowOffsetY}" step="1" data-property="shadowOffsetY" oninput="editTxt(this)">
                <label for="blur">Blur:</label>
                <input type="number" value="${txt.shadowBlur}" data-property="shadowBlur" oninput="editTxt(this)">
            </div>
        </div>
    `

    document.querySelector('.txt-list').innerHTML = strHtml;
}

function changeSelectedTxtIdx() {
    var meme = getMeme();
    if (meme.selectedTxtIdx === meme.txts.length - 1) return meme.selectedTxtIdx = 0;
    meme.selectedTxtIdx++;
}

function markSelectedTxt(txtidx) {
    // mark for 3 seconds which text is beign edited
}

function addTextLine() {
    console.log('adding text line');
}

function editTxtSize(val) {
    var meme = getMeme();
    var txtIdx = meme.selectedTxtIdx;
    meme.txts[txtIdx].size += val;
    handleMemeImg(meme);
}


function editTxt(elinput) {
    var meme = getMeme();
    var txtIdx = meme.selectedTxtIdx;
    var property = elinput.dataset.property;
    var childEl = elinput.firstElementChild;
    var value;

    switch (elinput.type) {
        case 'select-one':
            value = elinput.options[elinput.selectedIndex].value;
            break;
        case 'checkbox':
            value = elinput.checked;
            break;
        case 'submit':
            value = childEl.dataset.value;
            break;
        default:
            value = elinput.value;
            break;
    }
    meme.txts[txtIdx][property] = value;
    handleMemeImg(meme);
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