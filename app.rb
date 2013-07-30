require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'

require_relative 'routes/init'

require './lib/quiz'
require './models/quiz'
require './models/question'

class JSGames < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/solitaire' do
    erb :'solitaire/index'
  end

end