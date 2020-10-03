const { PDFDocument,PageSizes } = require('pdf-lib')
const { getName, generateName, clear, read, write } = require('./files')

const booklet = async (file) => {
  const name = getName(file)
  const firstName = generateName('../output', name, 'first')
  const secondName = generateName('../output', name, 'second')
  await clear(firstName)
  await clear(secondName)

  const pdf = await PDFDocument.load(await read(file))
  const first = await PDFDocument.create()
  const second = await PDFDocument.create()

  const pagesPrev = pdf.getPages().length
  const rest = pagesPrev % 4
  if(rest > 0) {
    const l = 4 - rest
    for (let i = 0; i < l ; i+= 1){
      const p = pdf.addPage(PageSizes.A4)
      p.drawText('.')
    }
  }
  const pages = pdf.getPages().length
  const l = pages / 2
  for (let i = 0; i < l; i += 2){
    const [a, b] = await first.copyPages(pdf, [i, pages-i-1])
    const [c, d] = await second.copyPages(pdf, [i+1, pages-i-2])
    first.addPage(b)
    first.addPage(a)
    second.addPage(c)
    second.addPage(d)
  }
  
  const bufFirst = await first.save()
  const bufSecond = await second.save()
  await write(bufFirst, firstName)
  await write(bufSecond, secondName)

}

module.exports = booklet
