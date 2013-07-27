class CreateHighscore < ActiveRecord::Migration
  def up
    create_table :highscores do |t|
      t.string :name
      t.integer :score

      t.timestamps
    end
  end

  def down
    drop_table :highscores
  end
end
