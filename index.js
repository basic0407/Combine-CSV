const Baby = require('babyparse')
const fs = require('fs')
/*
const pboData = Baby.parseFiles('csv/pbo-5k.csv', { header: true}).data

const pboDataMap = pboData.reduce((prev, row) => {
    const bib = Number.parseInt(row.Bib)
    prev[bib] = row
    return prev
}, {})

const thairunData = Baby.parseFiles('csv/thairun-5k.csv', { header: true }).data

const output = []

thairunData.forEach(row => {

})*/

const miceData = Baby.parseFiles('csv/miceData-5k.csv', { header: true }).data

const miceDataMap = miceData.reduce((prev, row) => {
    const bib = Number.parseInt(row.bib)
    prev[bib] = row
    return prev
}, {})

const timingData = Baby.parseFiles('csv/pbo-5k.csv', { header: true }).data

const output = []

timingData.forEach(row => {
    const bib = Number.parseInt(row.Bib)
    // console.log(bib)
    if(miceDataMap[bib]) {
        output.push(Object.assign({}, row, {
            Phone: miceDataMap[bib].phone ,
            Email: miceDataMap[bib].email ,
        }))
    } else { 
        console.log('missing', bib)
        // output.push(row)
    }
})

// console.log('output', output)
fs.writeFileSync('output.csv', Baby.unparse(output))