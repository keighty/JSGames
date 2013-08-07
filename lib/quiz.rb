require 'json'

module AnimalQuiz
  class Quizzer
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

      if clarifying_answer == 'yes'
        yes = Quiz.create(question: "Is it a #{new_animal}?")
        no = Quiz.create(question: current.question)
      else
        yes = Quiz.create(question: current.question)
        no = Quiz.create(question: "Is it a #{new_animal}?")
      end

      current.update_attributes(question: new_question, yes: yes.id, no: no.id)
    end

    private
      def format(question)
        question.capitalize!
        question += '?' unless question.include?('?')
      end
  end
end