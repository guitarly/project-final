class AddColumnFriendTable < ActiveRecord::Migration[5.0]
  def change
    add_column :friends, :fulladdress, :string
  end
end
