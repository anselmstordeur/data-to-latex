# data-to-latex
A data to latex converter. Great to visualize your data.  

### Getting Started:
Dependencies:
- npm
- ES6 compatible Javascript ([compatibility table](https://kangax.github.io/compat-table/es6/))

Usage:  

install using `npm install data-to-latex`
```javascript
const dataToLatex = require('data-to-latex');
dataToLatex.matrix.formattedTabular([0, 2, 3, 'string'], 2, {caption: 'My Caption'});
```
Would return Latex Result:
```
\(\begin{tabular}{ll}
\multicolumn{2}{c}{My Caption} \\\\ \\hline
0 & 2 \\
3 & string
\end{tabular}\)
```

### [Wiki](https://github.com/anselmstordeur/data-to-latex/wiki)