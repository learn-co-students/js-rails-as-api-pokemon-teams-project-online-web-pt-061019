class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find_by_id(params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end
end
