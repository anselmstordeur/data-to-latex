const assert = require('assert');
const Document = require('../document').Document;

'use strict';

describe('Document Class', function () {

  describe('Creating Documents', function () {

    it('should create a valid new Document with required fields', function () {
      const doc = new Document();
      assert.strictEqual(doc.class, 'article');
      assert.deepStrictEqual(doc.packages, [
        {
          'name': 'inputenc',
          'options': ['utf8']
        },
        {
          'name': 'amsmath'
        },
        {
          'name': 'amsfonts'
        },
        {
          'name': 'amssymb'
        }]);
      assert.deepStrictEqual(doc.options, ['10pt', 'a4paper']);
    });

    it('should create valid new Document with other class, options and packages', function () {
      const doc = new Document('', {
        class: 'report',
        options: ['11pt', 'twocollumn'],
        packages: [
          {
            name: 'graphics',
            options: ['utf8']
          }
        ]
      });

      assert.strictEqual(doc.class, 'report');
      assert.deepStrictEqual(doc.options, ['11pt', 'twocollumn']);
      assert.deepStrictEqual(doc.packages, [{
        name: 'graphics',
        options: ['utf8']
      }]);
    });

    it('should create valid ne Document with conten, title and author set', function () {
      const doc = new Document('\\section{First Section}\n', {
        title: 'The Section Document',
        author: 'The evil section writer'
      });

      assert.strictEqual(doc.content, '\\section{First Section}\n');
      assert.strictEqual(doc.title, 'The Section Document');
      assert.strictEqual(doc.author, 'The evil section writer');
    });
  });

  describe('toString Method', function () {

    it('should work on default values', function () {
      const doc = new Document();
      assert.strictEqual(doc.toString(),
`\\documentclass[10pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\begin{document}
\\end{document}\n`);
    });

    it('should work on all options set', function () {
      const doc = new Document('\\section{First Section}\n', {
        title: 'The Section Document',
        author: 'The evil section writer',
        class: 'report',
        options: ['11pt', 'twocolumn'],
        packages: [
          {
            'name': 'inputenc',
            'options': ['utf8']
          },
          {
            name: 'graphicx'
          }
        ]
      });
      assert.strictEqual(doc.toString(),
`\\documentclass[11pt,twocolumn]{report}
\\usepackage[utf8]{inputenc}
\\usepackage{graphicx}
\\author{The evil section writer}
\\title{The Section Document}
\\begin{document}
\\section{First Section}
\\end{document}\n`);
    });
  });

});