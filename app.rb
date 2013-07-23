require 'bundler'
Bundler.require

require './lib/mastermind'

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
    game.guess(params[:guess])
  end

  not_found do
    halt 404, 'page not found'
  end

  private
    def game
      @game ||= Mastermind::Game.new_with_code(params[:code])
    end
end