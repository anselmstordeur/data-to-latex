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

const exampleData = [
  "Name", "Registered", "Latitude", "Longitude", "Measurements",
  "Kim", "2015-04-17T12:52:08 -02:00", 53.988205, -166.008217, [20.8018, 25.4325],
  "Gordon", "2014-03-14T11:18:30 -01:00", 58.7322, -142.624466, [29.8197, 19.5144],
  "Mcclure", "2015-08-07T09:56:09 -02:00", 51.255166, 143.618947, [16.0908, 28.4438],
  "James", "2015-08-20T01:23:03 -02:00", 51.935684, 166.887844, [28.2362, 24.8768],
  "Branch", "2014-05-24T04:39:57 -02:00", 51.612881, -165.472281, [28.3879, 21.2844]
];

// creates a tabular with 5 columns
let dataMatrix = dataToLatex.formattedTabular(exampleData, 5);
// wraps it with the table keywords and the caption
let wrappedMatrix = dataToLatex.tableWrap(dataMatrix, 'Weatherstations');
// creates the document with the whole content
let doc = new dataToLatex.Document(wrappedMatrix);
// output the document as string
console.log(doc.toString());
```
Would return Latex Result:
```
\documentclass[10pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath}
\usepackage{amsfonts}
\usepackage{amssymb}
\begin{document}
\begin{table}[]
\caption{Weatherstations}
\begin{tabular}{lllll}
Name & Registered & Latitude & Longitude & Measurements \\
Kim & 2015-04-17T12:52:08 -02:00 & 53.988205 & -166.008217 & [20.8018,25.4325] \\
Gordon & 2014-03-14T11:18:30 -01:00 & 58.7322 & -142.624466 & [29.8197,19.5144] \\
Mcclure & 2015-08-07T09:56:09 -02:00 & 51.255166 & 143.618947 & [16.0908,28.4438] \\
James & 2015-08-20T01:23:03 -02:00 & 51.935684 & 166.887844 & [28.2362,24.8768] \\
Branch & 2014-05-24T04:39:57 -02:00 & 51.612881 & -165.472281 & [28.3879,21.2844]
\end{tabular}
\end{table}
\end{document}
```
Pdf file:
![alt text](https://raw.githubusercontent.com/wiki/anselmstordeur/data-to-latex/pdf.png)

|[Wiki](https://github.com/anselmstordeur/data-to-latex/wiki)|[GitHub](https://github.com/anselmstordeur/data-to-latex/)|
|---|---|