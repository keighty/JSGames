require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'

require_relative 'routes/init'

require './lib/quiz'
require './models/quiz'

class JSGames < Sinatra::Base
  set :root, File.dirname(__FILE__)

  get '/animalquiz' do
    erb :'animalquiz/index'
  end

  not_found do
    halt 404, 'not found'
  end

end