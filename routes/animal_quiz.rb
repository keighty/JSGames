require './lib/quiz'
require './models/quiz'

class JSGames < Sinatra::Base
  get '/animalquiz' do
    erb :'animalquiz/index'
  end

  get '/animalquiz/start' do
    quizzer.start
  end

  get '/animalquiz/question' do
  end

  private
    def quizzer
      @quizzer ||= AnimalQuiz::Quiz.new
    end
end