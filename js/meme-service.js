'use strict';

var gMeme;

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedTxtIdx: 0,
        txts: [createTxt('Text will be here'), createTxt('And here')]
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
        color: '#ffffff',
        strokeStyle: '#000000',
        isShadow: false,
        shadowColor: '#000000',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 0,
        x: x,
        y: y
    };
}

// fix this shit..  >_<

// function canvasClicked(ev) {
//     let clickedTxt = gMeme.txts.find((txt) => {
//         let textWidth = gCtx.measureText(txt.line);
//         return (
//             ev.offsetX > txt.x &&
//             ev.offsetX < txt.x - textWidth.width &&
//             ev.offsetY > txt.y &&
//             ev.offsetY < txt.y - 24
//         )
//     })
//     if (clickedTxt) console.log(clickedTxt);
// }

function deleteTxt() {
    var txtIdx = gMeme.selectedTxtIdx;
    gMeme.txts.splice(txtIdx, 1);
    handleMemeImg(gMeme);
}