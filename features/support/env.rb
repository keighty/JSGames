require_relative '../../app'
$LOAD_PATH << File.expand_path('../../../lib', __FILE__)
require 'mastermind'

require 'Capybara'
require 'Capybara/cucumber'
require 'rspec'
require 'webrat'

World do
  Capybara.app = JSGames

  # include Capybara::DSL
  # include RSpec::Matchers
end