require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'

require_relative 'routes/init'

require './lib/quiz'
require './models/quiz'
require './models/question'

class JSGames < Sinatra::Base

  get '/animalquiz' do
    erb :'animalquiz/index'
  end

  not_found do
    halt 404, 'not found'
  end

end