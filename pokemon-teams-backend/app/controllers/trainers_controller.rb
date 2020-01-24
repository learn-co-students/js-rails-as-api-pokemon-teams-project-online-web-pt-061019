class TrainersController < ApplicationController
    def index
        trainers = Trainer.all 
        # render json: trainers.to_json(:include => {:pokemons => {:only => [:id, :nickname, :species, :trainer_id]}
        # }, :except => [:created_at, :updated_at])

        # options = {
        #     include: [:pokemons]
        # }
        render json: TrainerSerializer.new(trainers).to_serialized_json
        # byebug
    end

    # for review, not needed:
    # def show
    #     trainer = Trainer.find_by(id: params[:id])
    #     if trainer
    #         render json: trainer.to_json(:include => {:pokemons => {:only => [:id, :nickname, :species, :trainer_id]}
    #             }, :except => [:created_at, :updated_at])
    #     else
    #         render json: {message: "No Pokemon found with that id"}
    #     end
    # end
end
