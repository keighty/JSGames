$LOAD_PATH.unshift(File.dirname(__FILE__))

require 'bundler'
Bundler.require

require 'config/environments'
require 'routes/init'

class JSGames < Sinatra::Base
  set :root, File.dirname(__FILE__)

  not_found do
    halt 404, 'not found'
  end

end