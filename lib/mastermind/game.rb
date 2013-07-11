module Mastermind
  class Game
    attr_accessor :code, :mark
    def initialize
      @mark = ''
    end
    def start(startcode)
      @code = startcode
    end
    def guess(guess)
      if @code.split('').first == guess[0]
        @mark << '+'
      elsif @code.include?(guess[0])
        @mark << '-'
      end
    end
    def generateCode
      (0...5).map { |i| rand((i == 0 ? 1 : 0)..9) }.join
    end
  end
end