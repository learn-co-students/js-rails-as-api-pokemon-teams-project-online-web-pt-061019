class TrainerSerializer 
    def initialize(trainer)
        @trainer = trainer 
    end 

    def to_serialized_json 
        options = {
            include: {
                pokemons: {
                    only: [:id, :species, :nickname, :trainer_id]
                }
            },
            except: [:created_at, :updated_at]
        }
        @trainer.to_json(options)
    end 
end 