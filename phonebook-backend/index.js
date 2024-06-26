const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body'))

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})
    
app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
    
    response.status(204).end()
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
    } else if (contacts.filter(c => c.name === body.name).length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else if (contacts.filter(c => c.number === body.number).length > 0) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    const contact = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    contacts = contacts.concat(contact)

    response.json(contact)
})

app.get('/info', (request, response) => {
    const contactInfo = contacts.length
    const date = Date(Date.now())

    const tempResponse = `Phonebook has info for ${contactInfo} people <br/> ${date}`

    response.send(tempResponse)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})