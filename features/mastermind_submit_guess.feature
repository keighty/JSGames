Feature: code-breaker submits guess
  The code-breaker submits a guess of five numbers
  The game marks the guess with + and - signs

  For each number in the guess that matches the number and position of a number in the secret code, the mark includes one + sign. For each number in the guess that matches the number but not the position of a number in the secret code, the mark includes one - sign.

  Scenario Outline: submit guess
    Given the secret code is "<code>"
    When I guess "<guess>"
    Then the mark should be "<mark>"

  Scenarios: all numbers correct
    | code  | guess | mark  |
    | 12345 | 12345 | +++++ |
    | 12345 | 12543 | ++--- |
    | 12345 | 15423 | +---- |
    | 12345 | 54321 | ----- |

  Scenarios: 4 numbers correct
    | code  | guess | mark |
    | 12345 | 12346 | ++++ |
    | 12345 | 12364 | +++- |
    | 12345 | 12634 | ++-- |
    | 12345 | 16234 | +--- |
    | 12345 | 61234 | ---- |

  Scenarios: 3 numbers correct
    | code  | guess | mark |
    | 12345 | 12366 | +++  |
    | 12345 | 12636 | ++-  |
    | 12345 | 16236 | +--  |
    | 12345 | 63126 | ---  |

  Scenarios: 2 numbers correct
    | code  | guess | mark |
    | 12345 | 12666 | ++   |
    | 12345 | 16266 | +-   |
    | 12345 | 61266 | --   |

  Scenarios: 1 number correct
    | code  | guess | mark |
    | 12345 | 16666 | +    |
    | 12345 | 26666 | -    |

  Scenarios: no matches
    | code  | guess | mark |
    | 12345 | 66666 |      |

