class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, except: [:created_at, :updated_at], include: :trainer
    end
    
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, except: [:created_at, :updated_at], include: :trainer
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon, except: [:created_at, :updated_at], include: :trainer
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
end