class PokemonsController < ApplicationController
    def index 
        pokemon = Pokemon.all 
        render json: pokemon 
    end 
    
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.create_with_faker(trainer) if trainer.pokemons.count < 6
        render json: pokemon
    end 

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id]).destroy 
        render json: pokemon 
    end 

end
