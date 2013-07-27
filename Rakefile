require './app'
require 'sinatra/activerecord/rake'
require 'rspec/core/rake_task'
require 'faker'

RSpec::Core::RakeTask.new do |task|
  task.rspec_opts = ["-r ./spec/spec_helper.rb"]
  task.pattern    = 'spec/**/*_spec.rb'
end

desc "run irb console"
task :console, :environment do |t, args|
  ENV['RACK_ENV'] = args[:environment] || 'development'
  exec "irb -r irb/completion -r ./app.rb"
end

namespace :db do
  desc "Fill database with sample data"
  task :populate, :environment do
    30.times do |n|
      name = Faker::Name.first_name
      score = 5 + rand(40)
      game = "solitaire"
      Highscore.create!(  name: name,
                          score: score,
                          game: game)
    end
    30.times do |n|
      name = Faker::Name.first_name
      score = 5 + rand(40)
      game = "mastermind"
      Highscore.create!(  name: name,
                          score: score,
                          game: game)
    end
  end

  desc 'Reset the database'
  task :reset, :environment do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
    ActiveRecord::Migrator.down('db/migrate')
    ActiveRecord::Migrator.migrate('db/migrate')
  end
end

task default: :spec