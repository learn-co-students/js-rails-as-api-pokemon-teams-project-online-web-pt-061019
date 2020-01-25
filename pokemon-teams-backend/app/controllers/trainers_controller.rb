class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    # options = {
    #   include: [:pokemons]
    # }
    # render json: TrainerSerializer.new(trainers, options)
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end

end
