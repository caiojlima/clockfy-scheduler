const { default: axios } = require('axios')
const express = require('express')
const cron = require('node-cron')
require('dotenv').config()

const app = express()

const startClockfyWatch = async () => {
  const requestPayload = {
    "billable": false,
    "description": "",
    "projectId": null,
    "taskId": null,
    "tagIds": null,
    "customFields": [],
    "type": "REGULAR",
    "continueStrategy": "REQUIRE_STOPPED"
  }
  await axios.post(process.env.CLOCKFY_URL, requestPayload, { headers: { "X-Auth-Token": process.env.X_AUTH_TOKEN } })

}

app.get('/', (req, res) => {
  return res.send('Api está no ar!')
});


cron.schedule('0 9 * * *', startClockfyWatch)

app.listen(3000, () => console.log('Ouvindo na porta 3000'))
