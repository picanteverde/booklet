var hummus = require('hummus');
var path = require('path');
var fs = require('fs');


var sourcePDF = path.join(__dirname, 'redes1.pdf');
var outputFolder = path.join(__dirname, '/output');



//delete any files that already exist in the output folder
fs.readdirSync(outputFolder).filter((file) => {
  fs.unlinkSync(path.join(outputFolder, file));
});

var pair = hummus.createWriter(path.join(outputFolder, `pair.pdf`));
var even = hummus.createWriter(path.join(outputFolder, `even.pdf`));

var from = 0, to= 319;

var pages = Math.ceil((to - from) /2)

for (var i = 0; i < pages; i += 1){
  const left = to - i;
  const right = from + i;
 if (i%2) {
  even.appendPDFPagesFromPDF(sourcePDF, {type:hummus.eRangeTypeSpecific,specificRanges: [ [ left,left ], [ right,right ] ]});
 } else {
  pair.appendPDFPagesFromPDF(sourcePDF, {type:hummus.eRangeTypeSpecific,specificRanges: [ [ left,left ], [ right,right ] ]});
 }
}
even.end();
pair.end();
