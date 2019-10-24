'use strict';

// TODOS:
// *** handle storage data 
// *** get from storage a random meme to show - meme-service
// *** make it look a lil better before final UI - css


var gMeme;

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedTxtIdx: 0,
        txts: [createTxt('Text will be here'), createTxt('And here', 200)]
    };
}

function getMeme() {
    return gMeme;
}


function createTxt(line, x = 250, y = 80) {
    return {
        line: line,
        size: 30,
        align: 'center',
        fontFamily: 'Impact',
        isOutline: true,
        lineWidth: 2,
        strokeStyle: '#ffffff',
        isShadow: false,
        shadowColor: '#000000',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 0,
        x: x,
        y: y
    };
}

function deleteTxt() {
    var txtIdx = gMeme.selectedTxtIdx;
    gMeme.txts.splice(txtIdx, 1);
    handleMemeImg(gMeme);
    renderTxtEditor();
}