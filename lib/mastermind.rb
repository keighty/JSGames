module Mastermind
  class Game
    attr_accessor :code, :mark
    def self.new_with_code(startcode)
      game = self.new
      game.code = startcode
      return game
    end
    def guess(guess)
      @mark = ''
      @guess = guess
      code = @code
      guess.split('').each_with_index do |char, index|
        if exact_match?(index)
          @mark << '+'
          code[index] = 'x'
        elsif number_match?(index)
          location = code.index(guess[index])
          unless exact_match?(location)
            @mark << '-'
            code[location] = 'x'
          end
        end
      end
      @mark.split('').sort.join
    end
    def generateCode
      (0...4).map { |i| rand((i == 0 ? 1 : 0)..9) }.join
    end
    def exact_match?(index)
      @code[index] == @guess[index]
    end
    def number_match?(index)
      @code.include?(@guess[index])
    end
  end
end