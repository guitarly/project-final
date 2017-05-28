class ChangeColumnNameFriend < ActiveRecord::Migration[5.0]
  def change
    remove_column :friends, :longtitude
    add_column    :friends, :longitude, :float
  end
end
