const fs = require('fs')
const path = require('path')

const getDirContent = async (dir) =>
  new Promise((resolve, reject) =>
    fs.readdir(dir, (err, files) =>
      err ? reject(err) : resolve(files.map((file) => path.join(dir, file)))
    )
  )

const getDir = (dir) => path.join(__dirname, dir)

const getName = (file) => path.basename(file, path.extname(file))

const isPdf = (file) => path.extname(file).toLowerCase() === '.pdf'

const generateName = (dir, name, variant) =>
  path.join(path.join(__dirname, dir), `${variant ? `${variant}-` : ''}${name}.pdf`)

const read = async (file) =>
  new Promise((resolve, reject) =>
    fs.readFile(file, (err, data) => (err ? reject(err) : resolve(data)))
  ) 

const write = async (data, file) => new Promise((resolve, reject) => 
  fs.open(file, 'w', (err, fd) => err
    ? reject(err)
    : fs.write(fd, data, 0, data.length, null, (err) => err
      ? reject(err)
      : fs.close(fd, resolve)
    )
  )
)

const clear = async (file) =>
  new Promise((resolve, reject) => fs.unlink(file, (err) => (err ? resolve(err) : resolve())))

module.exports = {
  generateName,
  getDirContent,
  getName,
  getDir,
  clear,
  read,
  write,
  isPdf
}
