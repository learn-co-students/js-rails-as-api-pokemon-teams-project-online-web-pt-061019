const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokemonContainer = document.querySelector('main') 

document.addEventListener('DOMContentLoaded', () => {
    
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => showTrainers(trainers)); 

    function showTrainers(trainers) {
        trainers.forEach(trainer => {
            const createdDiv = document.createElement('div')
            createdDiv.className = "card" 
            createdDiv.dataset.id = '${trainer.id}'

            let name = document.createElement('p') 
            name.innerText = '${trainer.name}' 

            let addPokeBtn = document.createElement('button')
            addPokeBtn.innerText = "Add Pokemon" 
            addPokeBtn.dataset.id = '${trainer.id}' 

            let pokeUl = document.createElement('ul')
            pokemonContainer.innerHTML = "" 

            trainer.pokemons.forEach(pokemon => {
                pokeUl.innerHTML += 
                '<li>${pokemon.nickname} (${pokemon.species}<buttonc class="relese" data-pokemon-ids="${pokemon.id}">Release</button></li>'
            })
        
        })

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

})