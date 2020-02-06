const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    getTrainers();
    getPokemons();
});

// Fetch pokemon and trainer data

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    // Use this data inside of `json` to do DOM manipulation
    buildCard(json);
  })
}

function getPokemons() {
  fetch(POKEMONS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    // Use this data inside of `json` to do DOM manipulation
  })
}

// Build the team card for each trainer

function buildCard(json) {
  console.log("Building the team cards for each trainer");

  for (let trainer of json) {

    let card = document.createElement("div")

    let p = document.createElement("p")
    let button = document.createElement("button")
    let ul = document.createElement("ul")

    // Add pokemon that already exist in that trainers team
    // addPokemon(ul, trainer)

    // console.log(trainer.pokemons)

    for (let pokemon of trainer.pokemons) {
      // console.log(pokemon)
      let li = document.createElement("li")
      let button = document.createElement("button")

      button.classList = "release"
      button.setAttribute("data-pokemon-id", pokemon.id)
      button.innerText = "Release"
      button.addEventListener('click', (e) => {
        // ul.removeChild(li)
        deletePokemon(e, li, button);
      });

      li.innerText = `${pokemon.nickname} (Species: ${pokemon.species})`
      li.append(button)
      ul.appendChild(li)

    }

    card.classList = "card"
    card.setAttribute("data-id", trainer.id)

    p.innerText = trainer.name

    button.innerText = "Add Pokemon"
    button.setAttribute("data-trainer-id", trainer.id)

    button.addEventListener('click', (e) => {
        addPokemon(e, trainer);
    });

    card.append(p)
    card.append(button)
    card.append(ul)

    main.appendChild(card)
  }
}

// When the "Add Pokemon" button is clicked, add a new pokemon to their team
function addPokemon(e, trainer) {

  // Add a brand new pokemon
  console.log("Add pokemon is running...")
  console.log(trainer)

  let data = {
    trainer_id: trainer.id,
  }

  let options = {
    method: 'POST',
    headers: {
         "Content-Type": "application/json",
         // "Accept": "application/json"
       },
   body: JSON.stringify(data)
  }

  // console.log(options)

  fetch(POKEMONS_URL, options)
  .then(function(response) {
    return response.json();
  })
  .then(function(p){
    // Use this data inside of `json` to do DOM manipulation
    // console.log(p)
    // Yo, a new pokemon!
    // console.log(p)
    //
    // return p.json();
    buildPokemon(e, p);
  })

  // fetch(TRAINERS_URL)
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(json){
  //   // Use this data inside of `json` to do DOM manipulation
  //   buildCard(json);
  // })

  // console.log(`NEW POKEMONE: ${p}`)



}

function buildPokemon(e, p) {
  console.log("Yo!")
  console.log(e.target)

  let ul = e.target.nextSibling
  let li = document.createElement("li")
  let button = document.createElement("button")

  button.classList = "release"
  button.setAttribute("data-pokemon-id", p.id)
  button.innerText = "Release"
  button.addEventListener('click', (e) => {
    deletePokemon(e, li, button);
  });

  li.innerText = `${p.nickname} (Species: ${p.species})`
  li.append(button)

  if (ul.childElementCount < 6) {
    ul.appendChild(li)
  } else {
    console.log("Sorry, a Pokemon trainer can only have 6 Pokemon on their team.")
  }
}

function deletePokemon(e, li) {
  // let ul = e.target.previousSibling
  // console.log(li)
  // console.log("😿")
  console.log(e.target.attributes)

  let id = e.target.attributes["data-pokemon-id"].value

  let data = {
    id: id,
  }

  let options = {
    method: 'DELETE',
    headers: {
         "Content-Type": "application/json",
         // "Accept": "application/json"
       },
   body: JSON.stringify(data)
  }

  // console.log(options)

  fetch(`${POKEMONS_URL}/${id}`, options)
  .then(function(response) {
    return response.json();
  })
  .then(function(p){
    // Use this data inside of `json` to do DOM manipulation
    // console.log(p)
    // Yo, a new pokemon!
    // console.log(p)
    //
    // return p.json();
    // console.log(p)

  })

li.parentElement.removeChild(li)

}
