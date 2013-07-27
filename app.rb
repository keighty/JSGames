# require 'bundler'
# Bundler.require
require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
require 'rspec/core/rake_task'

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
    @solitaire_scores = Highscore.find_all_by_game("solitaire")
    @mastermind_scores = Highscore.find_all_by_game("mastermind")
    erb :'highscore/index'
  end

  not_found do
    halt 404, 'not found'
  end

  private
    def game
      @game ||= Mastermind::Game.new_with_code(params[:code])
    end
end