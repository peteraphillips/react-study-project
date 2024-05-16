require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.json())
app.use(cors())

app.use(express.static('dist'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

  
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

// let contacts = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})
    
app.get('/api/contacts/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        
    })
    .catch(error => next(error))
})

app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId = contacts.length > 0
      ? Math.max(...contacts.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/contacts', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    } else if (!body.number) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    } 
    // else if (contacts.filter(c => c.name === body.name).length > 0) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // } else if (contacts.filter(c => c.number === body.number).length > 0) {
    //     return response.status(400).json({
    //         error: 'number must be unique'
    //     })
    // }

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})

app.put('api/contacts/:id', (request, response, next) => {
    const body = request.body
    console.log(request.params.id)

    const contact = {
        name: body.name,
        number: body.number,
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new:true })
    .then(updatedContact => {
        response.json(updatedContact)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const date = Date(Date.now())

    Contact.find({}).then(contacts => {

        const tempResponse = `Phonebook has info for ${contacts.length} people <br/> ${date}`
    
        response.send(tempResponse)
    })
    .catch(error => next(error))


})

  
app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})