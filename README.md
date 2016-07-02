# data-to-latex
A data to latex converter. Great to visualize your data.  

### Getting Started:
Dependencies:
- npm
- ES6 compatible Javascript ([compatibility table](https://kangax.github.io/compat-table/es6/))

Usage: 
```javascript
const dataToLatex = require('data-to-latex');
console.log(dataToLatex.matrix.formattedTabular([0, 2, 3, 'string'], 2, 'My Caption'));
```
Would return Latex Result:
```
\(\begin{tabular}{ll}
\multicolumn{2}{c}{My Caption} \\\\ \\hline
0 & 2 \\
3 & string
\end{tabular}\)
```

### Documentation:
- [matrix](docs/matrix.md)

### Contribute:
- [Git](https://github.com/anselmstordeur/data-to-latex.git)

### LICENSE
- [License](LICENSE)