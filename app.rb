require 'rubygems'
require 'sinatra'

configure do
  # set :public_folder, Proc.new { File.join(root, "public") }
end

get '/' do
  erb :index
end

get '/solitaire' do
  erb :solitaire
end