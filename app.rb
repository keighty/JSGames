require 'bundler'
Bundler.require

require './lib/mastermind'

class JSGames < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/solitaire' do
    erb :'solitaire/index'
  end

  get '/mastermind' do
    erb :'mastermind/index'
  end

  post '/mastermind/game/:guess' do
    game.guess(params[:guess])
  end

  not_found do
    halt 404, 'not found'
  end

  private
    def game
      @game ||= Mastermind::Game.new_with_code(params[:code])
    end
end