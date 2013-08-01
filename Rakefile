require './app'

desc "run irb console"
task :console, :environment do |t, args|
  ENV['RACK_ENV'] = args[:environment] || 'development'
  exec "irb -r irb/completion -r ./app.rb"
end

namespace :db do
  desc "Fill database with sample users"
  task :populate, :environment do
    ["solitaire", "mastermind"].each do |game|
      30.times do |n|
        name = Faker::Name.first_name
        score = 5 + rand(40)
        Highscore.create!(name: name,
                          score: score,
                          game: game)
      end
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

desc 'Run animal quiz specs'
task :quiz do |t|
  exec 'rspec spec/animalquiz/*_spec.rb'
end

desc 'Run all specs'
task :spec do |t|
  exec 'rspec spec'
end

task default: :spec