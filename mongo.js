const mongoose = require('mongoose')
// const{mongoPath} = require('./config.json')

const mongoPath = 'mongodb+srv://DT-Bot:BJQzSNEwbNUqUYll@discord-host.4cbpt.mongodb.net/Discord-Bot?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}