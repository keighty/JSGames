require 'lib/quiz'
require 'models/quiz'

class JSGames < Sinatra::Base
  get '/animalquiz' do
    erb :'animalquiz/index'
  end

  post '/animalquiz/start' do
    quizzer.ask
  end

  post '/animalquiz/wrong' do
    quizzer.wrong(params[:animal], params[:question], params[:answer])
  end

  private
    def quizzer
      @quizzer ||= AnimalQuiz::Quizzer.start(params[:id])
    end
end