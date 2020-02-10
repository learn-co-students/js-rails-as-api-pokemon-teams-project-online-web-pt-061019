class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
    # byebug
    trainerArr = @trainers.map( trainer => TrainerSerializer.new(trainer))
    # trainerArr = @trainers.map{|trainer| TrainerSerializer.new(trainer)}
    render json: trainerArr
      
  end

end