const axios = require('axios')
const btoa = require('btoa')

class Watson {
  constructor({
    apiKey,
    voice
  }) {
    const auth = btoa(`apikey:${apiKey}`)
    this.request = axios.create({
      method: 'POST',
      url: 'https://stream-fra.watsonplatform.net/text-to-speech/api/v1/synthesize',
      params: {
        voice: voice ? voice : 'fr-FR_ReneeVoice'
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
      const audio = await this.request({
        data: {
          text: text
        }
      })
      return audio.data
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Watson