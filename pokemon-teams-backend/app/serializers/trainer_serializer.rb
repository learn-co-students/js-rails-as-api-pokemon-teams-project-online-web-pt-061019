class TrainerSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :name
  # has_many :pokemons

  def initialize(trainer)
    @trainer = trainer
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          except: [:created_at, :updated_at]
        }
      },
      except: [:created_at, :updated_at]
    }
    @trainer.to_json(options)
  end
end
