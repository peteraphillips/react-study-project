# react-study-project
Study of React 

The contents of this repository are results of following the react study guide found here [title] https://fullstackopen.com/

## Additional Study 

### Functional Programming

**FUNCTIONS ARE VALUES**

`
var triple = function(x) {
    return x * 3
}

var waffle = triple

waffle(30)
`

*Higher order functions* 

Less logic = smaller, simpler functions

Filter example:

Array:
---
```
var animals = [
    {name: 'Fluffy', species: 'rabbit' },
    {name: 'Caro', species: 'dog' },
    {name: 'Hamilton', species: 'dog' },
    {name: 'Harold', species: 'fish' },
    {name: 'Ursula', species: 'cat' },
    {name: 'Jimmy', species: 'fish' },  
]
```

Traditional way of filtering:
---
```
var dogs = []
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species === 'dog')
    dogs.push(animals[i])
}
```

Simplified using the filter function:
---
```
var dogs = animals.filter(function(animal) {
    return animal.species === 'dog'
})
```

Simplified further:
---
```
var isFog = function(animal) {
    return animal.species === 'dogs'
}

var dogs = animals.filter(isDog)
```

Reject Example:
---
```
var otherAnimals = animals.reject(isDog)
```