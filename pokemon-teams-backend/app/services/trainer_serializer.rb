class TrainerSerializer

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
      except: [:updated_at, :created_at],
    }
    @trainer.to_json(options)
  end
end


# [
#   {
#     "id":1,
#     "name":"Prince",
#     "pokemons":[
#       {
#         "id":140,
#         "nickname":"Jacey",
#         "species":"Kakuna",
#         "trainer_id":1
#       },
#       {
#         "id":141,
#         "nickname":"Zachariah",
#         "species":"Ditto",
#         "trainer_id":1
#       },
#       // ...
#     ]
#   }
#   // ...
# ]
