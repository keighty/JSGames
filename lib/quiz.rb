module AnimalQuiz
  class Quiz
    attr_accessor :root, :current
    def initialize
      @root = QuizNode.new("Is it an elephant?", nil, nil)
    end

    def start
      @current = @root
      @current.question
    end

    def no
      if @current.no.nil?
        get_response
      else
        @current = @current.no
        return @current.question
      end
    end

    def yes
      @current = @current.yes
      return @current.question
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

      @current.question = question
      @current.yes = QuizNode.new("Is it a #{animal}", nil, nil)
      @current.no = QuizNode.new(old_question, nil, nil)
    end

    def printit
      print_all(self.root)
    end


    private
      def print_all(node)
        return if node.nil?
        print_all(node.yes)
        puts node.question
        print_all(node.no)
      end
  end
end

class QuizNode < Struct.new(:question, :yes, :no)
  def to_s
    @question
  end
end