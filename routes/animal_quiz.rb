class JSGames < Sinatra::Base
  get '/animalquiz' do
    erb :'animalquiz/index'
  end
end