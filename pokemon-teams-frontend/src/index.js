const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokemonContainer = document.querySelector('main')


// When a user loads the page, they should see all trainers, with their current team of Pokemon.

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => showTrainers(trainers)
    ); //END of fetch()
        
    function showTrainers(jsonTrainers) {
       
        // jsonTrainers.data.forEach(trainer => console.log(trainer))
        // iterate on array under data(Object)
        for(trainer of jsonTrainers){
            // debugger
        // <div class="card" data-id="1"><p>Prince</p>
            const createdDiv = document.createElement("div")
            createdDiv.className = "card"
            createdDiv.setAttribute('data-id', trainer.id)
            
            const nameTrainer = document.createElement('p')
            // debugger
            nameTrainer.innerText = trainer['name']
        
        // <button data-trainer-id="1">Add Pokemon</button>    
            const addPokeBtn = document.createElement('button')
            const ul = document.createElement('ul')
            addPokeBtn.innerText = 'Add Pokemon'
            addPokeBtn.addEventListener('click', e => {
                e.preventDefault()
               
                addNewPokemon(e)
            }) //END addPokeBtn

        // <ul>
        // <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
            // const ul = document.createElement('ul')
            // let trainerPokemons = jsonTrainers['included'].filter((poke) => {
            //         for(eachPoke in poke)
            //         console.log(eachPoke)
                
            // })

            
            // debugger
            // addPokeLi(trainerPokemons)
            // debugger 

            createdDiv.append(nameTrainer, addPokeBtn, ul)
            pokemonContainer.appendChild(createdDiv)
        }
    
        function addNewPokemon(newPoke) {
            
            const ulParent = newPoke.currentTarget.parentElement.querySelector('ul')
            
            let pokeData = {
                trainer_id: newPoke.target.getAttribute('data-trainer-id')
            }

            let configObj = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(pokeData)

            }

            fetch(POKEMONS_URL, configObj)
                .then(response => response.json())
                .then(json => {
                    const pokeLi = showLi(json)
                    ulParent.appendChild(pokeLi)
                })


            function showLi(pokemon) {
                debugger
            //Each li under ul ?
            for(pokemon of trainer.pokemons) {            
            const li = document.createElement('li')
            li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

            // Release Button for each li
            const releaseBtn = document.createElement('button')
            releaseBtn.className = 'release'
            releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
            releaseBtn.innerText = 'Release'
            releaseBtn.addEventListener('click', (e) => {
                e.preventDefault()
                releasePokemon(e)
            })
            li.append(releaseBtn)
            
            return li
            } //END of releaseBtn
            } //END of showLi
          
        } //END of addNewPokemon

    } //END of showTrainers

}); //END OF DOMContentLoaded


// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.