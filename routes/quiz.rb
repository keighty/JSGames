require './lib/quiz'
require './models/quiz'

class JSGames < Sinatra::Base
  get '/animalquiz' do
    erb :'animalquiz/index'
  end

  get '/animalquiz/start' do
    quizzer.ask
  end

  get '/animalquiz/yes' do
    quizzer.yes
  end

  get '/animalquiz/no' do
    quizzer.no
  end

  private
    def quizzer
      @quizzer ||= AnimalQuiz::Quiz.start
    end
end