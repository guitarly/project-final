class Friend < ApplicationRecord
  belongs_to :user

  geocoded_by :fulladdress
  after_validation :geocode
end
