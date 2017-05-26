class AddForeignKeyForFriends < ActiveRecord::Migration[5.0]
  def change
    add_column :friends, :user_id, :integer
  end
end
