class AddGameColumnToHighscore < ActiveRecord::Migration
  def change
    add_column :highscores, :game, :string
  end

  def down
  end
end
