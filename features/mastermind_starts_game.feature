Feature: mastermind starts game
  As a code-breaker
  So that I can break the code
  I want to play a game

  Scenario: start game
    Given I am on '/mastermind'
    When I follow "Start New Game"
    Then I should see "Welcome to Codebreaker!"
    And I should see "Enter guess:"