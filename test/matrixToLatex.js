const assert = require('assert');
const matrix = require('../matrix');

describe('Converts Matrix in a Latex Tabular', function () {

  describe('Test conversion in formatted Tabular', function () {

    it('should respond with a valid string', function () {
      assert.strictEqual(typeof matrix.formattedTabular([2, 2], 1), 'string', 'valid array');
    });

    it('should always responds with a valid string', function () {
      assert.strictEqual(typeof matrix.formattedTabular([null, undefined, NaN, 0, true, 0.0, { key: '2', value: 2 }, [2,1], new Date()], 3), 'string', 'array with crazy types in it');
    });

    it('should always responds with a valid string', function () {
      let bigArray = new Array(65536).fill(1);
      assert.strictEqual(typeof matrix.formattedTabular(bigArray, 120), 'string', 'big Array (65536 Elements)');
    });

    it('throws errors if matrix is undefined', function () {
      try {
        matrix.formattedTabular(null, 2);
        throw new Error('no Error thrown');
      } catch (err) {
        assert.strictEqual(err.message, 'Matrix is undefined');
      }
    });

    it('throws error if matrix is empty', function () {
      try {
        matrix.formattedTabular([], 1);
        throw new Error('no Error thrown');
      }catch (err){
        assert.strictEqual(err.message, 'Matrix is empty');
      }
    });

    it('throws error if width is undefined', function () {
      try {
        matrix.formattedTabular([1, 2], NaN);
        throw new Error('no Error thrown');
      }catch (err){
        assert.strictEqual(err.message, 'width is undefined');
      }
    });

    it('throws error if width is bigger than matrix', function () {
      try {
        matrix.formattedTabular([1, 2], 3);
        throw new Error('no Error thrown');
      }catch (err){
        assert.strictEqual(err.message, 'width is bigger than matrix');
      }
    });

    it('should respond with a well formatted Tabulor', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0, 0, 0], 2),
        `\\begin{tabular}{ll}
0 & 0 \\\\
0 & 0
\\end{tabular}\n`, 'simple 4x4 number matrix');
    });

    it('should respond with well formatted types', function (){
      assert.strictEqual(matrix.formattedTabular([null, undefined, NaN, 0, true, 0.0, { key: '2', value: 2 }, [2,1], 'string'], 3),
        `\\begin{tabular}{lll}
- & - & - \\\\
0 & true & 0 \\\\
{"key":"2","value":2} & [2,1] & string
\\end{tabular}\n`, 'matrix with crazy types');
    });

    it('should respond with a nice caption for the tabulor', function () {
      assert.strictEqual(matrix.formattedTabular([0, 0], 2, 'My Caption'),
        `\\begin{tabular}{ll}
\\multicolumn{2}{c}{My Caption} \\\\ \\hline
0 & 0
\\end{tabular}\n`, 'simple 4x4 number matrix');
    });
  });
});