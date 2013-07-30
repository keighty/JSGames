# require 'bundler'
# Bundler.require
require 'sinatra'
require 'sinatra/activerecord'

require './lib/mastermind'
require './lib/quiz'
require './config/environments'
require './models/highscore'
require './models/quiz'

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
    @solitaire_scores = Highscore.reorder(:score).find_all_by_game("solitaire", limit: 10)
    @mastermind_scores = Highscore.reorder(:score).find_all_by_game("mastermind", limit: 10)
    erb :'highscore/index'
  end

  post '/highscore/:name' do
    name = params[:name]
    score = params[:score]
    game_title = params[:game]
    Highscore.create(name: name, score: score, game: game_title)
  end

  not_found do
    halt 404, 'not found'
  end

  private
    def game
      @game ||= Mastermind::Game.new_with_code(params[:code])
    end
end