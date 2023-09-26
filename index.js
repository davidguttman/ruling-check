require('isomorphic-fetch')
const express = require('express')
const puppeteer = require('puppeteer')
const healthpoint = require('healthpoint')()

const checkCase = require('./check-case')

const ntfyUrl = 'https://ntfy.thhis.com'

const app = express()

app.get('/health', healthpoint)

app.get('/check/:caseNumber', async (req, res) => {
  const caseNumber = req.params.caseNumber
  const caseFound = await checkCase(caseNumber)
  res.send(caseFound ? 'Case was found.' : 'Case was NOT found.')
  
  if (!caseFound) {
    return fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: 'ruling-not-found',
        message: `Case ${caseNumber} was NOT found.`
      })
    })
  }

  fetch(ntfyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      topic: 'ruling',
      message: `Case ${caseNumber} was found.`
    })
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})