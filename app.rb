require 'sinatra'
require 'sinatra/activerecord'

require './lib/mastermind'
require './config/environments'
require './models/highscore'

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

  get '/highscores' do
    @solitaire_scores = get_high_score("solitaire")
    @mastermind_scores = get_high_score("mastermind")
    erb :'highscore/index'
  end

  post '/highscore/:name' do
    Highscore.create( name: params[:name],
                      score: params[:score],
                      game: params[:game])
  end

  not_found do
    halt 404, 'not found'
  end

  private
    def game
      @game ||= Mastermind::Game.new_with_code(params[:code])
    end

    def get_high_score(game)
      Highscore.reorder(:score).find_all_by_game(game, limit: 10)
    end
end