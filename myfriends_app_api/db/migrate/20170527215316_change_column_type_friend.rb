class ChangeColumnTypeFriend < ActiveRecord::Migration[5.0]
  def change
    change_column :friends, :phone, :string
  end
end
