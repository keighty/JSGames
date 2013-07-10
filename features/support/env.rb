require_relative '../../app'

require 'Capybara'
require 'Capybara/cucumber'
require 'rspec'
require 'webrat'

World do
  Capybara.app = JSGames

  # include Capybara::DSL
  # include RSpec::Matchers
end