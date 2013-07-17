require 'rubygems'
require 'sinatra/base'
# require 'lib/mastermind'

class JSGames < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/solitaire' do
    erb :solitaire
  end

  get '/mastermind' do
    erb :mastermind
  end

  post '/game/:guess' do
    game = set_game
    game.guess(params[:guess])
  end

  not_found do
    halt 404, 'page not found'
  end

  private
    def set_game
      @game = Mastermind::Game.start(params[:code])
    end
    # game = Mastermind::Game.start(session)
end
