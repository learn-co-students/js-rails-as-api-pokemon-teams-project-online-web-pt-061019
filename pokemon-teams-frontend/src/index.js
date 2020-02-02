document.addEventListener('DOMContentLoaded', e => {
    const BASE_URL = "http://localhost:3000";
    const TRAINERS_URL = `${BASE_URL}/trainers`;
    const POKEMONS_URL = `${BASE_URL}/pokemons`;

    const main = document.querySelector('main');    

    const trainersObj = {trainers: []};
        
    function fetchTrainers() {
        return fetch(TRAINERS_URL)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            for (const trainer of jsonData) {
                trainersObj.trainers.push(trainer);
                createCard(trainer);
            };
        });
    };
    fetchTrainers();

    function createCard(trainer) {
        const divCard = document.createElement('div');
        divCard.setAttribute('class', 'card');
        main.appendChild(divCard);
        
        const p = document.createElement('p');
        divCard.appendChild(p);
        p.innerText = trainer.name;

        const addButton = document.createElement('button');
        addButton.innerHTML = 'Add Pokemon';
        divCard.appendChild(addButton);
        addButton.setAttribute('data-id', trainer.id)

        const ul = document.createElement('ul');
        divCard.appendChild(ul);
        trainer.pokemons.map(pokemon => {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.innerText = `${pokemon.species} (${pokemon.nickname})`;

            const releaseButton = document.createElement('button');
            releaseButton.setAttribute('class', 'release');
            releaseButton.innerHTML = 'Release';
            li.appendChild(releaseButton);
            releaseButton.setAttribute('data-pokemon-id', pokemon.id);
        });
    };
    
    main.addEventListener('click', e => {
        if (e.target.innerText === 'Add Pokemon') {
            if (e.target.parentNode.querySelectorAll('li').length < 6) {
                const trainerId = e.target.dataset.id;
                fetchPokemons(trainerId);
            };
        }
        else if (e.target.innerText === 'Release') {
            pokemonId = e.target.dataset.pokemonId;
            e.target.parentNode.remove();
            fetch(POKEMONS_URL + `/${pokemonId}`, {method: 'DELETE'});
        };
    });

    function fetchPokemons(trainerId) { 
        const trainer = {trainer_id: trainerId}
        return fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainer)
        }) 
        .then(response => {
            return response.json()
        })
        .then(pokemon => {
            addNewPokemon(pokemon);
        });
    };

    function addNewPokemon(pokemon) { 
        const card = main.querySelector(`[data-id = '${pokemon.trainer_id}']`)
        const ul = card.nextSibling;
        const li = document.createElement('li');
        ul.appendChild(li);
        li.innerText = `${pokemon.species} (${pokemon.nickname})`;

        const releaseButton = document.createElement('button');
        releaseButton.setAttribute('class', 'release');
        releaseButton.innerHTML = 'Release';
        li.appendChild(releaseButton);
        releaseButton.setAttribute('data-pokemon-id', pokemon.id);
    };
});