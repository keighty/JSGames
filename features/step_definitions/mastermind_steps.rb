Given(/^I am on '(.+)'$/) do |url|
  visit(url)
end

When(/^I follow "(.*?)"$/) do |link|
  click_on link
end

Given(/^the secret code is "(.*?)"$/) do |secret|
  @game = Mastermind::Game.new
  @game.start('12345')
end

When(/^I guess "(.*?)"$/) do |guess|
  @game.guess(guess)
end

Then(/^the mark should be "(.*?)"$/) do |mark|
  @game.mark.should include(mark)
end