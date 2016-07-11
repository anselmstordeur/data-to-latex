const assert = require('assert');
const matrix = require('../matrix');

'use strict';

describe('Converts Matrix in a Latex Tabular', function () {

  describe('Test conversion in formatted Tabular', function () {

    it('should respond with a valid string on valid input', function () {
      assert.strictEqual(typeof matrix.formattedTabular([2, 2], 1), 'string');
    });

    it('should respond with a valid string on valid input with crazy types in it', function () {
      assert.strictEqual(typeof matrix.formattedTabular([null, undefined, NaN, 0, true, 0.0, { key: '2', value: 2 }, [2,1], new Date()], 3), 'string');
    });

    it('should respond with a valid string on big input (big Array with 65536 Elements)', function () {
      let bigArray = new Array(65536).fill(1);
      assert.strictEqual(typeof matrix.formattedTabular(bigArray, 120), 'string');
    });

    it('should throw error if matrix is undefined', function () {
      assert.throws(function () {
        matrix.formattedTabular(null, 2);
      }, /Matrix is undefined/);
    });

    it('should throw error if matrix is empty', function () {
      assert.throws(function () {
        matrix.formattedTabular([], 1);
      }, /Matrix is empty/);
    });

    it('should throw error if width is undefined', function () {
      assert.throws(function () {
        matrix.formattedTabular([1, 2], NaN);
      }, /width is undefined/);
    });

    it('should throw error if width is bigger than matrix', function () {
      assert.throws(function () {
        matrix.formattedTabular([1, 2], 3);

      }, /width is bigger than matrix/);
    });

    it('should respond with a well formatted Tabulor on valid input', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0, 0, 0], 2),
`\\begin{tabular}{ll}
0 & 0 \\\\
0 & 0
\\end{tabular}\n`, 'simple 4x4 number matrix');
    });

    it('should respond with well formatted types on valid crazy input', function (){
      assert.strictEqual(matrix.formattedTabular([null, undefined, NaN, 0, true, 0.0, { key: '2', value: 2 }, [2,1], 'string'], 3),
`\\begin{tabular}{lll}
- & - & - \\\\
0 & true & 0 \\\\
{"key":"2","value":2} & [2,1] & string
\\end{tabular}\n`, 'matrix with crazy types');
    });

    it('should respond with a nice caption for the tabulor on valid input with caption option', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0], 2, { caption: 'My Caption'}),
`\\begin{tabular}{ll}
\\multicolumn{2}{c}{My Caption} \\\\ \\hline
0 & 0
\\end{tabular}\n`, 'simple 4x4 number matrix');
    });

    it('should respond with full hLines and vLines on corresponding input', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0, 0, 0], 2, { vLines: [true, true, true], hLines: [true, true, true]}),
`\\begin{tabular}{|l|l|}
\\hline
0 & 0 \\\\ \\hline
0 & 0 \\\\ \\hline
\\end{tabular}\n`);
    });

    it('should respond with partial hLines on corresponding input', function () {
      assert.strictEqual(matrix.formattedTabular(new Array(8).fill(0), 3, { hLines: [true, true] }),
`\\begin{tabular}{lll}
\\hline
0 & 0 & 0 \\\\ \\hline
0 & 0 & 0 \\\\
0 & 0 &
\\end{tabular}\n`);
    });

    it('should respond with partial vLines on corresponding input', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0, 0, 0], 2, { vLines: [true] }),
`\\begin{tabular}{|ll}
0 & 0 \\\\
0 & 0
\\end{tabular}\n`);
    });

    it('should respond with caption and all Lines on corresponding input', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0, 0, 0], 2, { caption: 'Some Caption', vLines: [true, true, true], hLines: [true, true, true]}),
`\\begin{tabular}{|l|l|}
\\multicolumn{2}{c}{Some Caption} \\\\ \\hline
0 & 0 \\\\ \\hline
0 & 0 \\\\ \\hline
\\end{tabular}\n`);
    });
  });
});