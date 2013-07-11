Feature: mastermind starts game
  As a code-breaker
  So that I can break the code
  I want to play a game

  Scenario: start game
    Given I am on '/mastermind'
    When I follow "Start New Game"
    Then I should see "Mastermind"
    And I should see "Enter Guess"
    And I should see "Secret Code"
    And I should see "XXXXX"