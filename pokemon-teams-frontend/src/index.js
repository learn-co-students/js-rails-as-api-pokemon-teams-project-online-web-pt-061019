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
      console.log(json.included);
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
  let button = div.querySelector("button");
  button.addEventListener("click", (e) => {
    addNewPokemon(trainer)
  })
  let ul = div.querySelector("ul");
  trainer.pokemons.forEach(pokemon => {
    console.log(pokemon);
    createPokemonHTML(pokemon, ul)
  })
  main.appendChild(div);
}

function createPokemonHTML(pokemon, ul) {
  let li = document.createElement("li");
  li.innerHTML = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  ul.appendChild(li);
  let button = li.querySelector("button");
  button.addEventListener("click", function(e) {
    releasePokemon(pokemon);
  })
};

function releasePokemon(pokemon) {
  return fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response=>response.json())
  // .then(console.log(response.json())
  // {
  //   console.log(response);
  //   response.json();
  //   // console.log(response.json());
  //   // console.log(response.json());
  //   // return response.json();
  // }

  // .then(function(object) {
  //   console.log("deleted");
  // })
};

function addNewPokemon(trainer) {


};
