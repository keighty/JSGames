Feature: Recruiter visits the Home Page
  In order to play a game
  As a recruiter
  I want to see the home page

  Scenario: View home page
    Given I am on the home page
    Then I should see "Welcome to JSGames"

  Scenario: Find heading on home page
    Given I am on the home page
    Then I should find "Solitaire" in the selector "h2"
