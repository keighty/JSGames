FactoryGirl.define do
  factory :game do
    Game.new().start('12345')
  end
end