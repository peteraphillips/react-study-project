const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDb')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        required: true
    },
    number: {
        type: String,
        minLength: 11,
        maxLength: 11,
        required: true
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)