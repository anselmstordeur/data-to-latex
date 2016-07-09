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

### Working with options
```javascript
const dataToLatex = require('data-to-latex');

let exampleData = [
  "Name", "Registered", "Latitude", "Longitude", "Measurements",
  "Kim", "2015-04-17T12:52:08 -02:00", 53.988205, -166.008217, [20.8018, 25.4325],
  "Gordon", "2014-03-14T11:18:30 -01:00", 58.7322, -142.624466, [29.8197, 19.5144],
  "Mcclure", "2015-08-07T09:56:09 -02:00", 51.255166, 143.618947, [16.0908, 28.4438],
  "James", "2015-08-20T01:23:03 -02:00", 51.935684, 166.887844, [28.2362, 24.8768],
  "Branch", "2014-05-24T04:39:57 -02:00", 51.612881, -165.472281, [28.3879, 21.2844]
];

// create a subTabular for each array in the data
exampleData = exampleData.map(function (item) {
  if(Array.isArray(item)){
    return dataToLatex.formattedTabular(item, 2, {
      vLines: [false, true, false] // set for the measurements array only one vertical Line between the two values
    });
  }else{
    return item;
  }
});

let tabularOptions = {
  vLines: (new Array(6)).fill(true), // set 6 vertical lines to get a fully closed tabular
  hLines: (new Array(7)).fill(true)  // set 7 horizontal lines to close it horizontally, two
};

// creates a tabular with 5 columns
let dataMatrix = dataToLatex.formattedTabular(exampleData, 5, tabularOptions);
// wraps it with the table keywords and the caption
let wrappedMatrix = dataToLatex.tableWrap(dataMatrix, 'Weatherstations', {
  center: true
});
// creates the document with the whole content
let doc = new dataToLatex.Document(wrappedMatrix, {
  class: ['report'], // set documentClass to report
  options: ['11pt'], // set bigger font
  packages: [
    { // use inputenc package with utf8 options
      name: ['inputenc'],
      options: ['utf8']
    },
    { // use graphics packages with no options
      name: ['graphicx']
    }
  ]
});
// output the document as string
console.log(doc.toString());
```
Would return Latex result:
```
\documentclass[11pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\begin{document}
\begin{table}[]
\centering
\caption{Weatherstations}
\begin{tabular}{|l|l|l|l|l|}
\hline
Name & Registered & Latitude & Longitude & Measurements \\ \hline
Kim & 2015-04-17T12:52:08 -02:00 & 53.988205 & -166.008217 & \begin{tabular}{l|l}
20.8018 & 25.4325
\end{tabular}
 \\ \hline
Gordon & 2014-03-14T11:18:30 -01:00 & 58.7322 & -142.624466 & \begin{tabular}{l|l}
29.8197 & 19.5144
\end{tabular}
 \\ \hline
Mcclure & 2015-08-07T09:56:09 -02:00 & 51.255166 & 143.618947 & \begin{tabular}{l|l}
16.0908 & 28.4438
\end{tabular}
 \\ \hline
James & 2015-08-20T01:23:03 -02:00 & 51.935684 & 166.887844 & \begin{tabular}{l|l}
28.2362 & 24.8768
\end{tabular}
 \\ \hline
Branch & 2014-05-24T04:39:57 -02:00 & 51.612881 & -165.472281 & \begin{tabular}{l|l}
28.3879 & 21.2844
\end{tabular}
 \\ \hline
\end{tabular}
\end{table}
\end{document}
```
Pdf file: (Note the sub-tabular in the Measurements column)
![alt text](https://raw.githubusercontent.com/wiki/anselmstordeur/data-to-latex/pdf2.png)


### Documentation:
- [Document](https://github.com/anselmstordeur/data-to-latex/wiki/document)
- [basic](https://github.com/anselmstordeur/data-to-latex/wiki/basic)
- [matrix](https://github.com/anselmstordeur/data-to-latex/wiki/matrix)

### Project
- [Home](https://github.com/anselmstordeur/data-to-latex/wiki)
- [Contribute](https://github.com/anselmstordeur/data-to-latex/wiki/contribute)
- [License](https://github.com/anselmstordeur/data-to-latex/blob/master/LICENSE)