const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let trainerCard;

document.addEventListener('DOMContentLoaded', function(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json =>
        json.forEach(trainer => {
            createTrainerCard(trainer)
        })
    );
})

function createTrainerCard(trainer) {
    trainerCard = document.createElement("div");
    trainerCard.className = 'card';
    trainerCard.setAttribute("data-id", trainer.id)
    addTrainer(trainer);
     let list = document.createElement('ul');
     addPokemonButton(trainer, list);
    trainer.pokemons.forEach(pokemon => {
        addPokemon(pokemon, list);
    })
    trainerCard.appendChild(list)
    let mainDiv = document.querySelector('main');
    mainDiv.appendChild(trainerCard);
}

function addTrainer(trainer) {
    let p = document.createElement('p');
    p.innerText = trainer.name
    trainerCard.appendChild(p);
}

function addPokemon(pokemon, list) {
    let listItem = document.createElement('li');
    listItem.innerText = pokemon.nickname + " " + "(" + pokemon.species + ")";
    addReleaseButton(pokemon, listItem);
    list.appendChild(listItem);
}

function addPokemonButton(trainer, list) {
    let button = document.createElement('button');
    button.innerText = "Add Pokemon";
    button.setAttribute("data-trainer-id", trainer.id)
    trainerCard.appendChild(button);
    button.addEventListener('click', function() {
        newPokemon(trainer, list)
    });
}

function addReleaseButton(pokemon, listItem) {
    let button = document.createElement("button");
    button.innerText = "Release";
    button.className = "release";
    button.setAttribute("data-pokemon-id", pokemon.id)
    listItem.appendChild(button);
    button.addEventListener('click', function() {
        listItem.remove();
    });
}

function addPokemonToList(trainer) {
    trainer.pokemons.forEach(pokemon => {
        addPokemon(pokemon, list);
    })
}


function newPokemon(trainer, list) {
    if (list.childElementCount < 6) {

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          id: trainer.id,
          name: trainer.name,
        })
      }

        fetch(POKEMONS_URL, configObj)
          .then(res => res.json())
          .then((pokemon) => {
            console.log(pokemon)
            addPokemon(pokemon, list)
        })
    } else {
        console.log('Can\'t add anymore pokemon till some are deleted.')
    }
  }
