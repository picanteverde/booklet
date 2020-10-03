const { PDFDocument,PageSizes } = require('pdf-lib')
const { getName, generateName, clear, read, write } = require('./files')

const booklet = async (file) => {
  const name = getName(file)
  const frontName = generateName('../output', name, 'front')
  const backName = generateName('../output', name, 'back')
  await clear(frontName)
  await clear(backName)

  console.log(`Processing: ${file}`)

  let pdf
  try {
    pdf = await PDFDocument.load(await read(file))
  } catch(e){
    console.log(`Error reading ${file}\n${e}`)
  }
  const front = await PDFDocument.create()
  const back = await PDFDocument.create()

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
    console.log(`${(pages - (pages - i))/pages * 100}%`)
    const [a, b] = await front.copyPages(pdf, [i, pages-i-1])
    const [c, d] = await back.copyPages(pdf, [i+1, pages-i-2])
    front.addPage(b)
    front.addPage(a)
    back.addPage(c)
    back.addPage(d)
  }
  
  const bufFront = await front.save()
  const bufBack = await back.save()
  await write(bufFront, frontName)
  await write(bufBack, backName)

}

module.exports = booklet
