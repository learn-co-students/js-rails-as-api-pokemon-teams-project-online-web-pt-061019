const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => renderTrainers(json));
});

function renderTrainers(trainers){
    trainers.forEach(trainer => {
        const card = document.createElement("div");
            card.setAttribute('class', 'card'); 
            card.setAttribute('data-id', `${trainer.id}`)

        const p = document.createElement("p");
            p.textContent = `${trainer.name}`;
            // card.append(p)

        const addButton = document.createElement("button");
            addButton.setAttribute('class', 'add')
            addButton.setAttribute("data-trainer-id", `${trainer.id}`);
            addButton.textContent = "Add Pokemon";
        
        const ul = document.createElement("ul");
        
        for(const pokemon of trainer.pokemons){
            ul.append(createPokemon(pokemon))
        }
       
        card.append(p, addButton, ul);
        main.appendChild(card);
    })
}


function createPokemon(pokemon){
    const liPokemon = document.createElement("li");
        liPokemon.innerText = `${pokemon.nickname} (${pokemon.species})`;
        liPokemon.setAttribute('id', `${pokemon.id}`);
        
    const releaseButton = document.createElement("button");
        releaseButton.setAttribute('class', 'release');
        releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
        releaseButton.textContent = "Release";

    liPokemon.append(releaseButton)
    return liPokemon;

}

document.addEventListener("click", ({target}) => {
    switch(target.className.toUpperCase()){
        case 'RELEASE':
            let configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            let pokemonId = target.getAttribute("data-pokemon-id")
            fetch(POKEMONS_URL + `/${pokemonId}`, configObj)
                .then(resp => resp.json())
                .then(json => {target.parentNode.remove()}) 
            break;
        case 'ADD':
            let configObj2 = {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({trainer_id: target.getAttribute('data-trainer-id')})
            }
            fetch(POKEMONS_URL, configObj2)
                .then(resp => resp.json())
                .then(json => createPokemon(json))
            break;
    }
})
