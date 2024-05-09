# react-study-project
Study of React 

The contents of this repository are results of following the react study guide found here https://fullstackopen.com/

## Additional Study 

### Functional Programming

**FUNCTIONS ARE VALUES**

```
var triple = function(x) {
    return x * 3
}

var waffle = triple

waffle(30)
```

Higher order functions
---

Less logic = smaller, simpler functions with less bugs

Filter example:

*Array:*
```
var animals = [
    {name: 'Fluffy', species: 'rabbit' },
    {name: 'Caro', species: 'dog' },
    {name: 'Hamilton', species: 'dog' },
    {name: 'Harold', species: 'fish' },
    {name: 'Ursula', species: 'cat' },
    {name: 'Jimmy', species: 'fish' }
]
```

Traditional way of filtering:
```
var dogs = []
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species === 'dog')
    dogs.push(animals[i])
}
```

Simplified using the filter function:
```
var dogs = animals.filter(function(animal) {
    return animal.species === 'dog'
})
```

Simplified further:
```
var isFog = function(animal) {
    return animal.species === 'dogs'
}

var dogs = animals.filter(isDog)
```

Reject example:
```
var otherAnimals = animals.reject(isDog)
```

Map example:
```
var names = animals.map(function(animal) {
    return animal.name
})
```

Simplified using arrow functions:
```
var names = animals.map((animal) => animal.name)
```

Reduce example: 

*Array:*
```
var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 100 },    
]
```

Traditional way:
```
var totalAmount = 0
for (var i=0; i < orders.length; i++) {
    totalAmount += orders[i].amount
}
```

Simplified using reduce:
```
var totalAmount = orders.reduce(function(sum, order) {
    return sum + order.amount
}, 0)
```

Simplified using arrow functions:
```
var totalAmount = orders.reduce(function(sum, order) => return sum + order.amount, 0)
```
