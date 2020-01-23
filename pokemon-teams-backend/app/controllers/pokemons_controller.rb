class PokemonsController < ApplicationController

    def index
    pokemons = Pokemon.all
    # render json: pokemons.to_json(except: [:updated_at, :created_at])
    render json: PokemonSerializer.new(pokemons)
    end

    def create 
        # Option1
        pokemon = Pokemon.new
        pokemon.name = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.trainer_id = params[:trainer_id]

        # Option2
        # name = Faker::Name.first_name
        # species = Faker::Games::Pokemon.name
        # trainer_id = params[:trainer_id]
        # pokemon = Pokemon.new(nickname: name, species: species, trainer_id: trainer_id)
  
        if pokemon.save
            render json: PokemonSerializer.new(pokemon)
        else
            render json: {message: "Something's wrong! Could not save Pokemon"}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon 
        pokemon.delete
        # pokemon.destroy
    end

end

# Review:
# def index
#     pokemons = Pokemon.all
#     render json: pokemons.to_json(except: [:updated_at, :created_at])
# end

# def show
#     pokemon = Pokemon.find_by(id: params[:id])
#     if pokemon
#         render json: pokemon.to_json(except: [:updated_at, :created_at])
#     else
#         render json: {message: "No Pokemon found with that id"}
#     end
# end

# def new
#     pokemon = Pokemon.new
# end

