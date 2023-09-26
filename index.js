const express = require('express')
const puppeteer = require('puppeteer')

const checkCase = require('./check-case')

const app = express()

app.get('/check/:caseNumber', async (req, res) => {
  const caseNumber = req.params.caseNumber
  const caseFound = await checkCase(caseNumber)
  res.send(caseFound ? 'Case was found.' : 'Case was NOT found.')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
