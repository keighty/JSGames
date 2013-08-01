require 'models/highscore'

class JSGames < Sinatra::Base
  get '/highscores' do
    @solitaire_scores = get_high_score("solitaire")
    @mastermind_scores = get_high_score("mastermind")
    erb :'highscore/index'
  end

  post '/highscore/:name' do
    Highscore.create( name: params[:name],
                      score: params[:score],
                      game: params[:game])
  end

  private

    def get_high_score(game)
      Highscore.reorder(:score).find_all_by_game(game, limit: 10)
    end
end