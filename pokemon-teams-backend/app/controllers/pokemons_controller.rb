class PokemonsController < ApplicationController

    def create
        pokemon = Pokemon.new(poke_params)
        pokemon.randomize
        pokemon.save
        render json: PokemonSerializer.new(pokemon).to_serialized_json
      end

    def index
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def destroy
        Pokemon.find_by(id: params[:id]).destroy
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
