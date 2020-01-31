class PokemonSerializer

  def initialize(pokemon_object)
    @pokemon = pokemon_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          only: [:nickname, :species]
        }
      },
      except: [:updated_at],
    }
    @pokemon.to_json(options)
  end
end


# "id":140,
# "nickname":"Jacey",
# "species":"Kakuna",
# "trainer_id":1
