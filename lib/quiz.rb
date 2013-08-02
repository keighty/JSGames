module AnimalQuiz
  class Quizzer
    attr_accessor :root, :current

    def self.start
      quiz = self.new
      quiz.root = Quiz.find_by_id(1)
      quiz.current = quiz.root
      return quiz
    end

    def ask
      @current.question
    end

    def no
      if @current.no.nil?
        get_response
      else
        @current = Quiz.find_by_id(@current.no)
        return @current.question
      end
    end

    def yes
      @current = Quiz.find_by_id(@current.yes)
      return @current.question unless @current.nil?
    end

    def get_response
      puts "What animal were you thinking of?"
      animal = gets.chomp
      puts "what question could I ask to distinguish #{animal} from #{@current.question}"
      question = gets.chomp
      puts "what is the answer to the question?"
      answer = gets.chomp

      wrong(animal, question, answer)
    end

    def wrong(animal, question, answer)
      old_question = @current.question

      if answer == 'yes'
        yes = Quiz.create(question: "Is it a #{animal}")
        no = Quiz.create(question: old_question)
      else
        yes = Quiz.create(question: old_question)
        no = Quiz.create(question: "Is it a #{animal}")
      end

      @current.update_attributes(question: question, yes: yes.id, no: no.id)
    end
  end
end