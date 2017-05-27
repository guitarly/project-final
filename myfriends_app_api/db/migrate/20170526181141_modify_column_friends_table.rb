class ModifyColumnFriendsTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :friends, :latitude
    remove_column :friends, :longtitude
    add_column    :friends, :latitude, :float
    add_column    :friends, :longtitude, :float

  end
end
