class CreateFriends < ActiveRecord::Migration[5.0]
  def change
    create_table :friends do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.integer :latitude
      t.integer :longtitude
      t.integer :phone
      t.string :phone_company
      t.string :image

      t.timestamps
    end
  end
end
