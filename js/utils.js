'use strict';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var value = JSON.parse(str)
    return value;
}




// function renderTxtEditor() {
//     var meme = getMeme();
//     var strHtml = meme.txts.map(function (txt, idx) {
//         return `
//         <div class="txt-editor">
//             <div>
//                 <button onclick="deleteTxt(${idx})">
//                 <img class="icons trash-icon" src="./icons/trash.png"/>
//                 </button>
//                 <input type="text" data-property="line" placeholder="${txt.line}" oninput="editTxt(this,${idx})">
//                 <input type="range" value="${txt.size}" min="10" step="2" data-property="size" oninput="editTxt(this,${idx})">
//                 <input type="color" value="${txt.color}" data-property="color" oninput="editTxt(this,${idx})">
//                 <label for="font">Font:</label>
//                 <select data-property="fontFamily" oninput="editTxt(this,${idx})">
//                     <option value="${txt.fontFamily}">${txt.fontFamily}</option>
//                     <option value="Tahoma">Tahoma</option>
//                     <option value="Geneva">Geneva</option>
//                     <option value="Verdana">Verdana</option>
//                 </select>
//             </div>
//             <div>
//                 <input type="number" value="${txt.x}" min="0" step="5" data-property="x" oninput="editTxt(this,${idx})">
//                 <input type="number" value="${txt.y}" min="0" step="5" data-property="y" oninput="editTxt(this,${idx})">
//                 <select data-property="align" oninput="editTxt(this,${idx})">
//                     <option value="left">left</option>
//                     <option value="center">center</option>
//                     <option value="right">right</option>
//                 </select>
//             </div>
//             <div>
//                 <label for="outline">Outline Width:</label>
//                 <input id="outline" type="checkbox" data-property="isOutline" checked onclick="editTxt(this,${idx})">
//                 <input type="number" value="${txt.lineWidth}" min="0" step="1" data-property="lineWidth" oninput="editTxt(this,${idx})">
//                 <input type="color" value="${txt.strokeStyle}" data-property="strokeStyle" oninput="editTxt(this,${idx})">
//             </div>
//             <div>
//                 <input id="shadow" type="checkbox" data-property="isShadow" onclick="editTxt(this,${idx})">
//                 <label for="shadow">Shadow:</label>
//                 <input type="color" value="${txt.shadowColor}" data-property="shadowColor" oninput="editTxt(this,${idx})">
//                 <input type="number" value="${txt.shadowOffsetX}" step="1" data-property="shadowOffsetX" oninput="editTxt(this,${idx})">
//                 <input type="number" value="${txt.shadowOffsetY}" step="1" data-property="shadowOffsetY" oninput="editTxt(this,${idx})">
//                 <label for="blur">Blur:</label>
//                 <input type="number" value="${txt.shadowBlur}" data-property="shadowBlur" oninput="editTxt(this,${idx})">
//             </div>
//         </div>
//     `
//     })
//         .join(' ');
//     document.querySelector('.txts-list').innerHTML = strHtml;
// }