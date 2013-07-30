class CreateQuizTable < ActiveRecord::Migration
  def up
    create_table :quizzes do |t|
      t.string :question
      t.string :yes
      t.string :no

      t.timestamps
    end

    Quiz.create(question: "Do you swim?",
                    yes: "salmon",
                    no: "elephant")
  end

  def down
    drop_table :quizzes
  end
end
