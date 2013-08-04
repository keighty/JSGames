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
      @current.to_json
    end

    def wrong(animal, question, answer)
      old_question = @current.question
      question.titlecase!

      question += '?' unless question.include?('?')

      if answer == 'yes'
        yes = Quiz.create(question: "Is it a #{animal}?")
        no = Quiz.create(question: old_question)
      else
        yes = Quiz.create(question: old_question)
        no = Quiz.create(question: "Is it a #{animal}?")
      end

      @current.update_attributes(question: question, yes: yes.id, no: no.id)
    end
  end
end