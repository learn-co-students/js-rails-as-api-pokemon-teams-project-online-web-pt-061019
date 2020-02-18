class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons) 
    end 

    def create 
        name = Faker::Name.first_name 
        species = Faker::Games:Pokemon.name 

        trainer_id = params[:trainer_id]
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: trainer_id)

        render json: pokemon 
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon 
        pokemon.delete 
    end 

end

