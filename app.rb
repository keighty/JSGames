require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'sinatra/activerecord'
require './lib/mastermind'

set :database, "sqlite3:///blog.db"

class User < ActiveRecord::Base
end


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

  post '/game/:guess' do
    game.guess(params[:guess])
  end

get "/u" do
  @users = User.order("created_at DESC")
  erb :"users/index"
end

get "/u/users/new" do
  @title = "New User"
  @user = User.new
  erb :"users/new"
end

post "/u/users" do
  @user = User.new(params[:user])
  if @user.save
    redirect "/u/users/#{@user.id}"
  else
    erb :"users/new"
  end
end

get "/u/users/:id" do
  @user = User.find(params[:id])
  @title = @user.name
  erb :"users/show"
end

get "/u/users/:id/edit" do
  @user = User.find(params[:id])
  @title = "Edit Form"
  erb :"users/edit"
end

post "/u/users/:id" do
  puts params[:user]
  @user = User.find(params[:id])
  if @user.update_attributes(params[:user])
    redirect "/u/users/#{@user.id}"
  else
    erb :"users/edit"
  end
end

delete "/u/users/:id" do
  @user = User.find(params[:id]).destroy
  redirect "/u/"
end

  not_found do
    halt 404, 'page not found'
  end

  helpers do
    def name
      if @name
        "#{@name}"
      else
        "Me"
      end
    end

    def pretty_date(time)
      time.strftime("%d %b %Y")
    end
  end

  private
    def game
      @game ||= Mastermind::Game.new_with_code(params[:code])
    end
end

# curl -X POST -H "Accept: application/json" -d "code=12345" localhost:9393/game/12345