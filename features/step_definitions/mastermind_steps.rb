Given(/^I am on '(.+)'$/) do |url|
  visit(url)
end

When(/^I follow "(.*?)"$/) do |link|
  click_on link
end