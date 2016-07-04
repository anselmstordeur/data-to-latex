const assert = require('assert');

/**
 * @description Wraps a table around the given input string. Should be used for wrapping latex-tabulars.
 * @param {string} input - the input string or content that should be wrapped in the latex table
 * @param {string} caption - the table caption
 * @param {object} [options] - optional options for formatting the table
 * @param {boolean} [options.center] - should the table center its content?
 * @returns {string} input wrapped with a table
 */

function tableWrap(input, caption, options) {
  // make an exception for the assert function, because we want to allow empty strings
  if(input !== ''){
    assert.ok(input, 'input is undefined');
  }else if(caption !== ''){
    assert.ok(caption, 'caption is undefined');
  }

  if(typeof caption === 'object'){
    throw new Error('caption is of type object');
  }

  if(typeof input === 'object'){
    input = JSON.stringify(input);
  }

  let centering = '';

  if(typeof options === 'object' && Object.keys(options).indexOf('center') >= 0 && options.center){
    centering = '\\centering\n';
  }

  return '\\begin{table}[]\n' +
    centering +
    '\\caption{' + caption + '}\n' +
    input +
    '\\end{table}\n';
}

module.exports = {
  tableWrap: tableWrap
};