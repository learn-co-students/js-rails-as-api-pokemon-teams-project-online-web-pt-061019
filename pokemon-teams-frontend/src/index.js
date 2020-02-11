const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')

let pokemons =[]
fetch(POKEMONS_URL)
  .then(res => res.json())
  .then(json => pokemons = json)

fetch(TRAINERS_URL)
  .then(res => res.json())
  // .then(putTrainersOnPage)
  // .then(json => console.log(json))
  .then(json => putTrainersOnPage(json))
  

function putTrainersOnPage(trainers){
  // console.log(pokemons)
  trainers.forEach(trainer => {
  // console.log(trainer)
    let pokString = ""
    trainer_pokemons = pokemons.filter(pokemon => {
      // console.log(trainer.id)
      // console.log(pokemon.trainer_id)
      return trainer.id === pokemon.trainer_id})

    // console.log(trainer_pokemons)
    trainer_pokemons.forEach(pokemon => {
      pokString += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
    mainDiv.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>${pokString}</ul>
    </div>
    `
  })

  mainDiv.addEventListener('click', e => {
    if (e.target.dataset.trainerId !== undefined) {
      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trainer_id: e.target.dataset.trainerId
        })
      })
        // .then(res => res.json())
        .then(res => {
          console.log(`status: ${res.status}`);
          console.dir(res.body);
          return res.json()
        })
        // .then(addPokemon)

        // .then(json => console.log(json))

        .then(myJson => addPokemon(myJson))
        // .catch(function (error) {
        //   console.log('Request failed', error);
        // });
    }
    if (e.target.dataset.pokemonId !== undefined){
      e.target.parentElement.remove()
      fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {method : 'DELETE'})
    }
  })

  function addPokemon(pokemon){
    console.log(pokemon)
    mainDiv.children[pokemon.trainer_id-1].lastElementChild.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  }


}