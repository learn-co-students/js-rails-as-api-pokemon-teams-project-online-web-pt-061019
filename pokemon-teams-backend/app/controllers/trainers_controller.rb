class TrainersController < ApplicationController
    def index
        trainers = Trainer.all 
        render json: trainers, only: [:name, :id], include: :pokemons
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer, only: [:name, :id], include: :pokemons
    end
end
