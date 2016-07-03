const assert = require('assert');

/**
 * @description Takes an array as matrix and converts it to an latex Tabular.
 * @param {object} matrix - Data Array -> gets sliced in rows of the tabular depending on the width parameter
 * @param {int} width - width or breadth of the matrix. Array gets cut depending on this parameter
 * @param {object} [options] - optional options for formatting the tabular
 * @param {string} [options.caption] - a nice caption for the tabular
 * @param {boolean[]} [options.hLines] - an array which elements say if a horizontal line should be printed in top of a row. To get a fully closed tabular the array has to be filled with (rows + 1) true statements.
 * @param {boolean[]} [options.vLines] - an array which elements say if a vertical line should be printed left of a column. To get a fully closed tabular the array has to be filled with (columns + 1) true statements.
 * @returns {string} - Latex Tabular
 */

function formattedTabular(matrix, width, options) {

  // check for valid matrix
  assert.ok(matrix, 'Matrix is undefined');
  if(Array.isArray(matrix) && matrix.length < 1){
    throw new Error('Matrix is empty');
  }

  // check for valid width
  assert.ok(width, 'width is undefined');
  if(typeof width !== 'number'){
    throw new Error('width is undefined');
  } else if(width > matrix.length){ // check if matrix is possible
    throw new Error('width is bigger than matrix');
  }

  let collumnHead = 'l'.repeat(width);
  let caption = '';
  let row = 0;

  let data = '';
  let foot = '\\end{tabular}\n';

  if(typeof options === 'object'){
    // caption
    if(Object.keys(options).indexOf('caption') >= 0 && typeof options.caption === 'string'){
      caption = '\\multicolumn{' + width + '}{c}{' + options.caption + '} \\\\ \\hline\n';
    }
    // vLines
    if(Array.isArray(options.vLines)){
      collumnHead = '';
      for(let i = 0; i <= width; i++){
        collumnHead += options.vLines[i] ? '|' : '';
        if(i < width){
          collumnHead += 'l';
        }
      }
    }
    // for hLines fitst row
    if(Object.keys(options).indexOf('hLines') >= 0 && Array.isArray(options.hLines) && options.hLines[row]){
      caption += caption.length > 0 ? '' : '\\hline\n'; // if no caption and hLine in first line
      row++;
    }
  }

  let head = '\\begin{tabular}{' + collumnHead + '}\n';

  matrix.forEach(function (item, index, arr) {
    // sanitize item
    if(item === null || typeof item === 'undefined'){
      item = '-';
    } else if(typeof item === 'object'){
      item = JSON.stringify(item);
    } else if(typeof item === 'number' && (isNaN(item) || !isFinite(item))){
      item = '-';
    }

    let lineEnd = '';
    let itemEnd = '';

    // if item is last of row
    if((index + 1) % width === 0 || index === (arr.length - 1)){
      if(typeof options === 'object' && Array.isArray(options.hLines) && options.hLines[row]){
        lineEnd += ' \\\\ \\hline'
      }else {
        lineEnd = (((index + 1) < arr.length) ? ' \\\\' : ''); // but not last of matrix
      }
      lineEnd += '\n';
      row++;
    }else {
      itemEnd = ' & ';
    }
    if(index + 1 === arr.length && (index + 1) % width !== 0){
      itemEnd = ' &';
    }
    data += item + itemEnd + lineEnd;
  });
  return head + caption + data + foot;
}

module.exports = {
  formattedTabular: formattedTabular
};