const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')


function getTrainers(){
    fetch(TRAINERS_URL)
      .then(resp => resp.json())
      .then(json => renderTrainers(json))
};

function renderTrainers(json){
    json.forEach(trainer => {
          const divCard = document.createElement('div')
          divCard.className = "card"
          divCard.dataset.id = `${trainer.id}`

          let name = document.createElement('p')
          name.innerText = `${trainer.name}`
          
          let addButton = document.createElement('button')
          addButton.innerHTML = "Add Pokemon"
          addButton.dataset.id = `${trainer.id}`

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
    })
};

document.addEventListener('click', function(event){
    if (event.target.innerHTML === "Add Pokemon"){
        if (event.target.nextElementSibling.childElementCount < 6){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                    },
                body: JSON.stringify({
                    "trainer_id": event.target.dataset.id
                    })
            })
            .then(resp => resp.json())
            .then(pokemon => addPokemon(pokemon))
        }
    }
    else if (event.target.innerHTML === "Release"){
        event.target.parentElement.remove()
        
        fetch(POKEMONS_URL + `/${event.target.dataset.pokemonId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
                }
        })
        
    }
});

function addPokemon(pokemon){
    main.children[pokemon.trainer_id-1].lastElementChild.innerHTML += 
    `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

document.addEventListener("DOMContentLoaded", function(){
    getTrainers()
})