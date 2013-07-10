require 'rubygems'
require 'sinatra/base'

Dir.glob("controllers/*.rb").each { |r| require_relative r }

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
end
