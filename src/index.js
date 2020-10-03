const { getDirContent, getDir } = require('./files')
const booklet = require('./booklet')

getDirContent(getDir('../input'))
  .then((files) => Promise.all(files.map(booklet)))