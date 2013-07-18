require './app'
require 'rubygems'
require 'rspec/core/rake_task'
# require 'sinatra/activerecord/rake'

RSpec::Core::RakeTask.new do |task|
  task.rspec_opts = ["-c", "-f progress", "-r ./spec/spec_helper.rb"]
  task.pattern    = 'spec/**/*_spec.rb'
end