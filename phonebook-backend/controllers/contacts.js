const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

contactsRouter.get('/', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})
    
contactsRouter.get('/:id', (request, response, next) => {
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

contactsRouter.delete('/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
  
contactsRouter.post('/', (request, response, next) => {
    const body = request.body

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
    .catch(error => next(error))
})

contactsRouter.post('/:id', (request, response, next) => {
    const body = request.body
    console.log(request.params.id)

    const contact = {
        name: body.name,
        number: body.number,
    }

    Contact.findByIdAndUpdate(
        request.params.id, 
        contact, 
        { new:true, runValidators: true, context: 'query' }
    )
    .then(updatedContact => {
        response.json(updatedContact)
    })
    .catch(error => next(error))
})

contactsRouter.get('/info', (request, response) => {
    const date = Date(Date.now())

    Contact.find({}).then(contacts => {

        const tempResponse = `Phonebook has info for ${contacts.length} people <br/> ${date}`
    
        response.send(tempResponse)
    })
    .catch(error => next(error))

})

module.exports = contactsRouter
