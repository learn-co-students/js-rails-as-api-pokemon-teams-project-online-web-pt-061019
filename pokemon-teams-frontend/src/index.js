const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers(){
    fetch(TRAINERS_URL)
      .then(resp => resp.json())
      .then(json => renderTrainers(json))
};

function renderTrainers(json){
    json.forEach(trainer => {
          const main = document.querySelector('main')

          let divCard = document.createElement('div')
          divCard.className = "card"
          divCard.id = `${trainer.id}`
          
          let name = document.createElement('p')
          name.innerText = `${trainer.name}`
          
          let addButton = document.createElement('button')
          addButton.innerHTML = "Add Pokemon"
          addButton.id = `${trainer.id}`

          let pokemonsUL = document.createElement('ul')
          pokemonsUL.innerHTML = ""

          trainer.pokemons.forEach(pokemon => {
              pokemonsUL.innerHTML +=
              `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
          })

          divCard.appendChild(name)
          divCard.appendChild(addButton)
          divCard.appendChild(pokemonsUL)
          main.appendChild(divCard)
    });
};

document.addEventListener("DOMContentLoaded", function(){
    getTrainers()
})