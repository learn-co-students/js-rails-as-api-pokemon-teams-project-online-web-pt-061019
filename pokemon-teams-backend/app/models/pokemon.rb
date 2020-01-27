class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.create_with_faker(trainer)
    name = Faker::Name.first_name 
    species = Faker::Games::Pokemon.name 
    self.create(nickname: name, species: species, trainer_id: trainer.id)
  end 

end
