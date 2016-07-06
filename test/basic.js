const assert = require('assert');
const basic = require('../basic');

"use strict";

describe('Basic simple wrapping, formatting syntax', function () {

  describe('Wrap some content in a table', function () {

    it('should respond with a string on empty input', function () {
      assert.strictEqual(typeof basic.tableWrap('', ''), 'string');
    });

    it('should respond with a string on some latex input', function () {
      assert.strictEqual(typeof basic.tableWrap(`\\begin{tabular}{ll}
\\multicolumn{2}{c}{My Caption} \\\\ \\hline
0 & 0
\\end{tabular}\n`, 'My Caption'), 'string');
    });

    it('should respond with a string on some object input', function () {
      assert.strictEqual(typeof basic.tableWrap({ key: 'foo', value: 'bar' }, 'Caption'), 'string');
    });

    it('should throw error on undefined input', function () {
      let types = [undefined, null, NaN];
      types.forEach(function (type) {
        try {
          basic.tableWrap(type, '');
          throw new Error('no Error thrown');
        }catch (err){
          assert.strictEqual(err.message, 'input is undefined');
        }
      });
    });

    it('should trow error on undeclare caption', function () {
      try {
        basic.tableWrap('sdfsfasdf');
        throw new Error('No error thrown');
      }catch (err){
        assert.strictEqual(err.message, 'caption is undefined');
      }
    })

    it('should throw error on undefined caption', function () {
      let types = [undefined, null, NaN];
      types.forEach(function (type) {
        try {
          basic.tableWrap('', type);
          throw new Error('no Error thrown');
        }catch (err){
          assert.strictEqual(err.message, 'caption is undefined');
        }
      });
    });

    it('should throw error on caption of type object', function () {
      try {
        basic.tableWrap('', {key: 'foo', value: 'bar'});
        throw new Error('no Error thrown');
      }catch (err){
        assert.strictEqual(err.message, 'caption is of type object');
      }
    });

    it('should wrap a table around empty string', function () {
      assert.strictEqual(basic.tableWrap('', ''),
`\\begin{table}[]
\\caption{}
\\end{table}\n`);
    });

    it('should wrap a table around some latex tabulars', function () {
      assert.strictEqual(basic.tableWrap(
`\\begin{tabular}{lll}
\\hline
0 & 0 & 0 \\\\ \\hline
0 & 0 & 0 \\\\
0 & 0 &
\\end{tabular}
\\begin{tabular}{lll}
\\hline
0 & 0 & 0 \\\\ \\hline
0 & 0 & 0 \\\\
0 & 0 &
\\end{tabular}\n`, ''),
`\\begin{table}[]
\\caption{}
\\begin{tabular}{lll}
\\hline
0 & 0 & 0 \\\\ \\hline
0 & 0 & 0 \\\\
0 & 0 &
\\end{tabular}
\\begin{tabular}{lll}
\\hline
0 & 0 & 0 \\\\ \\hline
0 & 0 & 0 \\\\
0 & 0 &
\\end{tabular}
\\end{table}\n`);
    });

    it('should wrap a table with a caption around a latex tabular', function () {
      assert.strictEqual(basic.tableWrap(
`\\begin{tabular}{|l|l|}
\\multicolumn{2}{c}{Some Caption} \\\\ \\hline
0 & 0 \\\\ \\hline
0 & 0 \\\\ \\hline
\\end{tabular}\n`, 'The Great Caption'),
`\\begin{table}[]
\\caption{The Great Caption}
\\begin{tabular}{|l|l|}
\\multicolumn{2}{c}{Some Caption} \\\\ \\hline
0 & 0 \\\\ \\hline
0 & 0 \\\\ \\hline
\\end{tabular}
\\end{table}\n`);
    });

    it('should add the centering option on corresponding input', function () {
      assert.strictEqual(basic.tableWrap(
`\\begin{tabular}{ll}
0 & 0 \\\\
0 & 0 \\\\
\\end{tabular}\n`, '', { center: true }),
`\\begin{table}[]
\\centering
\\caption{}
\\begin{tabular}{ll}
0 & 0 \\\\
0 & 0 \\\\
\\end{tabular}
\\end{table}\n`);
    });
  });
});