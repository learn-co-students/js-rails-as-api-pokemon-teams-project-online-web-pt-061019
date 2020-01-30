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
    console.log(json)
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
    console.log(json)
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

    card.classList = "card"
    card.setAttribute("data-id", trainer.id)

    p.innerText = trainer.name

    button.innerText = "Add Pokemon"
    button.setAttribute("data-trainer-id", trainer.id)

    card.append(p)
    card.append(button)
    card.append(ul)

    main.appendChild(card)
  }
}
