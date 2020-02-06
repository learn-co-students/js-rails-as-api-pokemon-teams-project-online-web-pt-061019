class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find_by_id(params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    # params = {
    #   nickname: Faker::Name.first_name,
    #   species: Faker::Games::Pokemon.name,
    #   trainer_id: params[:id]
    # }
    # pokemon = Pokemon.create!(params)

    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer = Trainer.find_by_id(params[:trainer_id])

    new_poke = trainer.pokemons.build(nickname: name, species: species)
    new_poke.save
    render json: PokemonSerializer.new(new_poke).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find_by_id(params[:id])
    pokemon.destroy
  end
end
