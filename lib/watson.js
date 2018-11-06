const axios = require('axios')
const fs = require('fs')
const path = require('path')  
const btoa = require('btoa')

class Watson {
  constructor({apiKey}) {
    const auth = btoa(`apikey:${apiKey}`)
    this.request = axios.create({
        method: 'POST',
        url: 'https://stream-fra.watsonplatform.net/text-to-speech/api/v1/synthesize',
        params: {
          voice: 'fr-FR_ReneeVoice'
        },
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'audio/mp3'
        },
        responseType: 'stream'
    })
  }

  async generateAudio(text) {
    try {
      const path = path.resolve(__dirname, 'result.mp3')
      const audio = await this.request({
        data: {
          text: text
        }
      })
      
      audio.data.pipe(fs.createWriteStream(path))
  
    // return a promise and resolve when download finishes
    return new Promise((resolve, reject) => {
      audio.data.on('end', () => {
        resolve()
      })
  
      audio.data.on('error', () => {
        reject()
      })
    })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Watson