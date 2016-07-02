const assert = require('assert');

/**
 * @description takes an array as matrix and converts it to an latex Tabular.
 * @param matrix - Data Array
 * @param width - width or breadth of the matrix. Array get cut depending on this param.
 * @param title - the caption of the Latex Tabular
 * @returns {string} - Latex Tabular
 */

function formattedTabular(matrix, width, title) {

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

  let head = '\\begin{tabular}{' + 'l'.repeat(width) + '}\n';

  let caption = '';
  if(typeof title === 'string' && title.length > 0){
    caption = '\\multicolumn{' + width + '}{c}{' + title + '} \\\\ \\hline\n';
  }

  let data = '';
  let foot = '\\end{tabular}\n';

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
    if((index + 1) % width === 0){
      lineEnd = (((index + 1) < arr.length) ? ' \\\\\n' : '\n'); // but not last of matrix
    }else {
      itemEnd = ' & ';
    }
    data += item + itemEnd + lineEnd;
  });
  return head + caption + data + foot;
}

module.exports = {
  formattedTabular: formattedTabular
};