require 'lib/mastermind'

class JSGames < Sinatra::Base
  get '/mastermind' do
    erb :'mastermind/index'
  end

  post '/mastermind/game/:guess' do
    game.guess(params[:guess])
  end

  private
    def game
      @game ||= Mastermind::Game.start(params[:code])
    end
end