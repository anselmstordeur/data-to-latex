class Document {

  /**
   * @description Creates the documentClass, package, author, title, document-begin and document-end for you.
   * @param {string} content - The Content of your document
   * @param {object} options - optional option object
   * @param {string} options.author - the author of the document
   * @param {string} options.title - the title of the document
   * @param {string} options.class=article - latex documentClass. For Example: 'article' or 'report'
   * @param {string[]} options.options=['10pt','a4paper'] - latex documentOptions. For Example: ['twocolumn','11pt']
   * @param {object[]} options.packages - an object array with each object representing an package
   * @param {string} options.packages[].name - name of the package
   * @parma {string[]} options.packages[].options - options for the package
   */
  constructor(content, options){

    this.content = typeof content === 'string' ? content : '';

    // set default values
    this.class = 'article';
    this.options = ['10pt', 'a4paper'];
    this.packages = [
      {
        name: 'inputenc',
        options: ['utf8']
      },
      {
        name: 'amsmath'
      },
      {
        name: 'amsfonts'
      },
      {
        name: 'amssymb'
      }
    ];

    // analyze if options are set
    if(typeof options === 'object'){
      if(typeof options.class === 'string'){
        this.class = options.class;
      }

      if(typeof options.author === 'string'){
        this.author = options.author;
      }

      if(typeof options.title === 'string'){
        this.title = options.title;
      }

      if(Array.isArray(options.options)) {
        this.options = options.options;
      }

      if(Array.isArray(options.packages)){
        this.packages = options.packages;
      }
    }
  }

  /**
   * @description Converts the full document to one string. This is what you should call before you output your document.
   * @returns {string}
   */
  toString() {
    const documentClass = '\\documentclass' + JSON.stringify(this.options).replace(/"/g, '') + '{' + this.class + '}\n';
    const documentPackages = this.packages.map(function (pkg) {
      const pkgOptions = Array.isArray(pkg.options) ? JSON.stringify(pkg.options).replace(/"/g, '') : '';
      return '\\usepackage' + pkgOptions + '{' + pkg.name + '}\n';
    }).join('');
    const documentAuthor = typeof this.author === 'string' ? '\\author{' + this.author + '}\n' : '';
    const documentTitle = typeof this.title === 'string' ? '\\title{' + this.title + '}\n' : '';

    return documentClass + documentPackages + documentAuthor + documentTitle + '\\begin{document}\n' + this.content + '\\end{document}\n';
  }
}

module.exports = Document;