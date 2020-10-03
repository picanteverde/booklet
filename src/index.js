const { getDirContent, getDir,isPdf } = require('./files')
const booklet = require('./booklet')

getDirContent(getDir('../input'))
  .then((files) => Promise.all(files.filter(isPdf).map(booklet)))