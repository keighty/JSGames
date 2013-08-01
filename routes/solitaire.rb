class JSGames < Sinatra::Base
  get '/solitaire' do
    erb :'solitaire/index'
  end
end