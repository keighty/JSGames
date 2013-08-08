require 'json'

# AnimalQuiz is the controller
class AnimalQuiz
  attr_accessor :current

  def self.start(id)
    quiz = self.new
    quiz.current = Quiz.find_by_id(id)
    return quiz
  end

  def ask
    current.to_json
  end

  def learn_new_animal(new_animal, clarifying_question, clarifying_answer)
    new_question = format(clarifying_question)

    pathA = Quiz.create(question: "Is it a #{new_animal}?")
    pathB = Quiz.create(question: current.question)

    if clarifying_answer == 'yes'
      make_new_branch(new_question, pathA.id, pathB.id)
    else
      make_new_branch(new_question, pathB.id, pathA.id)
    end

  end

  private
    def format(question)
      question.capitalize!
      question += '?' unless question.include?('?')
    end

    def make_new_branch(new_question, yes_path, no_path)
      current.update_attributes(question: new_question, yes: yes_path, no: no_path)
    end
end