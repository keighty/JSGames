#Animal Quiz

Here’s an animal quiz program to try as a Ruby Quiz.
It works like this: The program starts by telling the user to think of an animal. It then begins asking a series of yes/no questions about that animal: Does it swim? Does it have hair? And so on.... Eventually, it will narrow down the possibilities to a single animal and guess: is it a mouse?
If the program has guessed correctly, the game is over and may be restarted with a new animal. If the program has guessed incorrectly, it asks the user for the kind of animal they were thinking of and then asks for the user to provide a question that can distinguish between its incorrect guess and the correct answer. It then adds the new question and animal to its “database” and will guess that animal in the future (if appropriate). Your program should remember what it has learned between runs.

This seems a bit like a binary search tree with data persistence

⇒ Think of an animal...
Is it an elephant? (y or n)
⇐n
⇒ You win. Help me learn from my mistake before you go...
What animal were you thinking of?
⇐ a rabbit
⇒ Give me a question to distinguish a rabbit from an elephant. ⇐ Is it a small animal?
⇒ For a rabbit, what is the answer to your question? (y or n) ⇐y
⇒ Thanks.
Play again? (y or n)
⇐y
⇒ Think of an animal...
Is it a small animal? (y or n)
⇐y
⇒ Is it a rabbit? (y or n)
⇐n
⇒ You win. Help me learn from my mistake before you go...
What animal were you thinking of?
⇐ a Shih Tzu
⇒ Give me a question to distinguish a Shih Tzu from a rabbit.
⇐ Is it a kind of dog?
⇒ For a Shih Tzu, what is the answer to your question? (y or n) ⇐ y
⇒ Thanks.
Play again? (y or n)
⇐ y
⇒ Think of an animal...
Is it a small animal? (y or n)
⇐ y
⇒ Is it a kind of dog? (yorn) ⇐y
⇒ Is it a Shih Tzu? (yorn) ⇐y
⇒ I win. Pretty smart, aren' t I?
Play again? (y or n)
⇐ n

How can I do this?
Question database?
|id|Question|Y| N|
|--|:------:| :--: | :--: |
|1|Does it swim?|Salmon|Elephant|

1. user is thinking of a tiger.
2. computer asks does it swim?
2. user says no.
3. computer says, it is an elephant! Amirite?
4. user says no
5. computer says aw nuts! what animal were you thinking of
6. user says "TIGER"
7. Give me a question to distinguish a tiger from an elephant?
8. user says "does it have stripes?"
9. For tiger, what is the answer to the question?
10. user says Yes

|id|Question|Y| N|
|--|:------:| :--: | :--: |
|1|Does it swim?|3|2|
|2|Does it have stripes?|Tiger|Elephant|
|3|Does it have legs?|Frog|Salmon|

1. tell user to think of an animal
2. ask does it swim?
3.