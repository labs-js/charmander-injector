<h1 align="center">charmander-injector</h1>

<p align="center">
    <img alt="charmander-injector" src="https://raw.githubusercontent.com/labs-js/air-check/a3278c20ef13110a5f0a5358ad80e184c7afe787/charmander-logo.png" width="300">
</p>

<p align="center">
    Dependency injector for Node.js written in Vanilla JS
</p>

<p align="center">
  <a href="https://travis-ci.org/labs-js/charmander-injector">
    <img alt="Travis Status" src="https://travis-ci.org/labs-js/charmander-injector.svg?">
  </a>
  <a href="https://codecov.io/gh/labs-js/charmander-injector">
    <img alt="Code Coverage" src="https://codecov.io/gh/labs-js/charmander-injector/branch/develop/graph/badge.svg">
  </a>
  <a href="https://www.bithound.io/github/labs-js/charmander-injector">
    <img alt="bitHound" src="https://www.bithound.io/github/labs-js/charmander-injector/badges/score.svg">
  </a>  
  <a href="https://www.npmjs.com/package/charmander-injector">
    <img alt="npm" src="https://img.shields.io/npm/v/charmander-injector.svg?style=flat">
  </a>  
  <a href="https://github.com/labs-js/turbo-commit/blob/master/CONVENTION.md">
    <img alt="Turbo Commit" src="https://img.shields.io/badge/Turbo_Commit-on-3DD1F2.svg">
  </a>
  <a href="https://codeclimate.com/github/labs-js/charmander-injector">
    <img alt="Code Climate" src="https://codeclimate.com/github/labs-js/charmander-injector/badges/gpa.svg">
  </a>
</p>

## How to use it ?

```javascript
charmander.register('depenendecy', require('dependency');
module.exports = charmander.inject(['dependency'], function(dependency){
    return dependency.helloWorld();
}, this)();
```

## Use case
You're building an app to get all pokemons around the world starting with an specific char. To do that, you have the following module

```javascript
var pokemon = require('pokemon'); 
module.exports = {
    getPokemonStartingWith: function(char) {
        var pokemons = pokemon.all(),
            filteredPokemons = pokemons.filter(function(p) {
                return p[0].toUpperCase() === char.toUpperCase();
            });
        return filteredPokemons;
    }
}
```

In last example, we required the 'pokemon' module to get every pokemon around the world. The function of our module, works as expected, but we know you're a great developer and you want to start testing. 

When you started to write the test, you've realized that var pokemon = require('pokemon')' should have been injected somehow, otherwise it won't be possible to test with a mock pokemon module. 

Therefore, you need an injector, and that's when charmander-injector does its magic. Let's refactor our module using 🔥 charmander 🔥. 

```javascript
var charmander = require('charmander-injector');
charmander.register('pokemon', require('pokemon'));

module.exports = charmander.inject(
    ['pokemon'], 
    getPokemon
)();

function getPokemon(pokemon) {
    'use strict'
    return function getPokemonStartingWith(char) {
        var pokemons = pokemon.all(),
            filteredPokemons = pokemons.filter(function(p) {
                return p[0].toUpperCase() === char.toUpperCase();
            });
        return filteredPokemons;
    }
}
```

And this is your test!

```javascript
var charmander = require('charmander-injector');
charmander.registerMock('pokemon', {
        all: function() {
            return ['dummy pokemon 1', 'aPokemon', 'aaPokemon'];
        }
    });
//The order is important (for now)
var getPokemonStartingWith = require('../example');

describe('example', function() {
    'use strict';

    it('getPokemonsStartingWith x char', function() {

        var result = getPokemonStartingWith('a');

        expect(result).toEqual(['aPokemon', 'aaPokemon']);
    });
});
```
