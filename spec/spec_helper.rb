require 'simplecov'
SimpleCov.start

require File.join(File.dirname(__FILE__), '..', 'app.rb')
require 'rspec'
require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'

include Capybara::DSL
Capybara.app = JSGames