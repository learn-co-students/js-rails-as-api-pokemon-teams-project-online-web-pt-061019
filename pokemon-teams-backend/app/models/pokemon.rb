class Pokemon < ApplicationRecord
  belongs_to :trainer

  require 'faker'
  require 'securerandom'

  def randomize
    self.nickname = Faker::Name.first_name
    self.species = Faker::Games::Pokemon.name
  end
end
