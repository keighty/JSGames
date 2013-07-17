class CreateTopPlayers < ActiveRecord::Migration
  def up
    create_table :top_players do |t|
      t.string :initials
      t.number :score
      t.timestamps
    end
  end

  def down
    drop_table :top_players
  end
end
