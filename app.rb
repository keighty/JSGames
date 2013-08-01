require 'sinatra'
require 'sinatra/activerecord'
require './config/environments'
require_relative 'routes/init'

class JSGames < Sinatra::Base
  set :root, File.dirname(__FILE__)

  not_found do
    halt 404, 'not found'
  end

end