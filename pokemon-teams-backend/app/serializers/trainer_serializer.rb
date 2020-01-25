class TrainerSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :name
  # has_many :pokemons

  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          only: [:id, :nickname, :species, :trainer_id]
        }
      },
      # include: [:id, :name]
    }
    @trainer.to_json(options)
  end
end
