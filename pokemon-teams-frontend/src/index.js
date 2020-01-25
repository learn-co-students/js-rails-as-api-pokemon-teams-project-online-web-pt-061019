const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", ()=>{
  //display all trainers and Pokémon

  //display all trainers
  let memoizedTrainers = [];
  fetch(TRAINERS_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      memoizedTrainers = json;
      memoizedTrainers.forEach(trainer => {
        createTrainerHTML(trainer);
      })
    })


})

function createTrainerHTML(trainer) {
  let div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("data-id", trainer.id);
  div.innerHTML = `<p>${trainer.name}</p><button data-trainer-id="${trainer.id}">Add Pokemon</button><ul></ul>`;
  let ul = div.querySelector("ul");
  let button = div.querySelector("button");
  button.addEventListener("click", (e) => {
    // if(trainer.pokemons.length < 6) {
      addNewPokemon(trainer, ul)
    // } else if(trainer.pokemons.length >= 6) {
    //   console.log(trainer)
    // }
  })
  trainer.pokemons.forEach(pokemon => {
    createPokemonHTML(pokemon, ul)
  })
  main.appendChild(div);
}

function createPokemonHTML(pokemon, ul) {
  let li = document.createElement("li");
  li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
  ul.appendChild(li);
  let button = li.querySelector("button");
  button.addEventListener("click", function(e) {
    releasePokemon(pokemon, li);
  })
};

function releasePokemon(pokemon, li) {
  fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE",
  })
  .then(function(response) {
    li.remove();
    return response.text();
  })
  .catch(error=>console.log(error))
};

function addNewPokemon(trainer, ul) {
  if (ul.getElementsByTagName("li").length < 6) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "trainer_id": trainer.id
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      createPokemonHTML(object, ul);
      console.log(object);
    })
  } else if (ul.getElementsByTagName("li").length >= 6) {
    alert("the pokemon league forbids it!")
  }
};
