const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const vietPhraseSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('phrase-channels', vietPhraseSchema)