require 'lib/quiz'
require 'models/quiz'

class JSGames < Sinatra::Base
  get '/animalquiz' do
    erb :'animalquiz/index'
  end

  post '/animalquiz/ask' do
    quizzer.ask
  end

  post '/animalquiz/learn' do
    quizzer.learn_new_animal(params[:animal], params[:question], params[:answer])
  end

  private
    def quizzer
      @quizzer ||= AnimalQuiz.start(params[:id])
    end
end