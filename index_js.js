const BabyParse = require('babyparse')
const fs = require('fs')

const miceData = BabyParse.parseFiles('data/mice.csv', { header: true }).data

const miceDataMap = miceData.reduce((prev, row) => {
  const bib = Number.parseInt(row.bib)
  prev[bib] = row
  return prev
}, {})

const timingData = BabyParse.parseFiles('data/timing.csv', { header: true }).data

const output = []

timingData.forEach(row => {
  const bib = Number.parseInt(row.ATF1)
  if (miceDataMap[bib]) {
    output.push(Object.assign({}, row, {
      Phone: miceDataMap[bib].phone,
      Email: miceDataMap[bib].email,
      NameOnBib: miceDataMap[bib].nameOnBib
    }))
  } else {
    output.push(row)
    // console.log('not found', row.ATF1)
  }
})

fs.writeFileSync('data/output.csv', BabyParse.unparse(output))

// // console.log({ miceData })
// console.log({ miceDataMap })
// console.log({ output })