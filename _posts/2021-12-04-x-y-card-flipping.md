---
layout: post_with_embedding
title: Flipping Cards 'Til You Can't
tags: [Sequences]
embedding_path: /assets/x_plus_y_demo/index.html
---
## Motivation
I recently came across a fun clip from a 2014 movie called _X + Y_ that features a clever mathematical
proof of the eventual result of a simple card game. I was impressed by the proof and also
by the fact that this clip had been viewed more than 40 million times!
While the proof has caught the attention of many, I feel that it also
represented a nice opportunity to show how computer science can make mathematics
a little bit more tangible. Be sure to go all the way to the bottom to play with an interactive
simulation I made for this game!

But before we get into that, let's take a peek at the video.
<iframe width="560" height="315" src="https://www.youtube.com/embed/mYAahN1G8Y8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>To reiterate, the game is simple:
* you have a row of cards all face down
* a move consists of turning a face-down card up AND turning over the card immediately to the right (which might be face-up or face-down)

Claim: no matter what choice of turns, this sequence of turns must terminate.

The (rough) proof of the claim:
* If we let 1 represent a face-down card and 0 represent a face-up card, then the row of cards
represents a positive binary integer.
* Regardless of the move, the resulting binary integer representation will always decrease.
* Therefore, since the number can't go negative, the moves must stop.

We could flesh out this proof a little bit more, but that's not my primary purpose with this post.

## Math vs Computer Science
In college, I studied math because I wanted to get a lot of practice solving problems like these.
The road to a solution is often long and arduous, but once you figure it out, it's a very satisfying.
Besides, you can then move right on to the next problem.

When it comes to writing software, you might have to figure out the same problem, but even once
you've finally figured it out, you'll then have to spend a lot of time writing the code to actually
_use_ this solution.

Back in college, I thought the main problem-solving part was the most important part and the software
portion was just an added bonus. In the time since then, however, I've come to learn that I was missing out
on some of the good stuff by moving on too quickly to the next problem. With taking the time to
write a piece of software for a particular problem, you get the opportunity to really _see_ the
problem coming to life as you steep in the problem for longer.

## Python Demo
Returning to this card-flipping problem, we've see that the student proves the claim with a
few sentences. But what I've done here is write out a python script that runs through
a set of moves and shows that it eventually does indeed terminate.

I did make **one assumption**: you are allowed to flip over the last card, but since there's
no card to the right to flip over, that's simply the end of the move. If you don't want to
accept this assumption then I believe you must limit yourself not flipping over the last card.
In the end, it doesn't really matter.

I wrote a python function called `flip_til_you_cant_game(num_cards)` that represents playing this
game where you choose your turns at random.
Before I share the code, here's a sample output for a game with 20 cards.
Each arrow points to the card that was used for the move.

```python
>>> flip_til_you_cant_game(20)
11111111111111111111 (base 10: 1048575)

11111110011111111111 (base 10: 1042431)
       ^            
11111110010011111111 (base 10: 1041663)
          ^         
11100110010011111111 (base 10: 943359)
   ^                
11100110010011100111 (base 10: 943335)
               ^    
11100110010010000111 (base 10: 943239)
             ^      
10000110010010000111 (base 10: 550023)
 ^                  
10000110010010000001 (base 10: 550017)
                 ^  
10000110010001000001 (base 10: 549953)
            ^       
10000000010001000001 (base 10: 525377)
     ^              
01000000010001000001 (base 10: 263233)
^                   
01000000010001000000 (base 10: 263232)
                   ^
01000000010000100000 (base 10: 263200)
             ^      
01000000001000100000 (base 10: 262688)
         ^          
01000000000100100000 (base 10: 262432)
          ^         
00100000000100100000 (base 10: 131360)
 ^                  
00100000000100010000 (base 10: 131344)
              ^     
00100000000010010000 (base 10: 131216)
           ^        
00010000000010010000 (base 10: 65680)
  ^                 
00010000000001010000 (base 10: 65616)
            ^       
00001000000001010000 (base 10: 32848)
   ^                
00001000000001001000 (base 10: 32840)
               ^    
00000100000001001000 (base 10: 16456)
    ^               
00000100000001000100 (base 10: 16452)
                ^   
00000100000001000010 (base 10: 16450)
                 ^  
00000100000000100010 (base 10: 16418)
             ^      
00000010000000100010 (base 10: 8226)
     ^              
00000010000000010010 (base 10: 8210)
              ^     
00000010000000010001 (base 10: 8209)
                  ^
00000010000000010000 (base 10: 8208)
                   ^
00000001000000010000 (base 10: 4112)
      ^             
00000001000000001000 (base 10: 4104)
               ^    
00000001000000000100 (base 10: 4100)
                ^   
00000000100000000100 (base 10: 2052)
       ^            
00000000100000000010 (base 10: 2050)
                 ^  
00000000010000000010 (base 10: 1026)
        ^           
00000000010000000001 (base 10: 1025)
                  ^
00000000010000000000 (base 10: 1024)
                   ^
00000000001000000000 (base 10: 512)
         ^          
00000000000100000000 (base 10: 256)
          ^         
00000000000010000000 (base 10: 128)
           ^        
00000000000001000000 (base 10: 64)
            ^       
00000000000000100000 (base 10: 32)
             ^      
00000000000000010000 (base 10: 16)
              ^     
00000000000000001000 (base 10: 8)
               ^    
00000000000000000100 (base 10: 4)
                ^   
00000000000000000010 (base 10: 2)
                 ^  
00000000000000000001 (base 10: 1)
                  ^
00000000000000000000 (base 10: 0)
                   ^
```

Now, here's the code for this function.
```python
from typing import List
import random

def flip_til_you_cant_game(num_cards: int = 20):

    cards = ["1"] * num_cards
    facedown_i = list(range(num_cards))
    spaces = [" "] * num_cards

    def take_turn() -> int:
        random_down_card_i = random.sample(facedown_i, 1).pop()  # choose random down card

        # flip chosen card
        cards[random_down_card_i] = "0"
        facedown_i.remove(random_down_card_i)

        # flip card to the right (if not last card)
        if random_down_card_i < num_cards - 1:
            right_card_i = random_down_card_i + 1
            right_card = cards[right_card_i]
            if right_card == "1":
                cards[right_card_i] = "0"
                facedown_i.remove(right_card_i)
            else:
                cards[right_card_i] = "1"
                facedown_i.append(right_card_i)

        return random_down_card_i

    def visualize_turn(cards, chosen_i=None):  
        if chosen_i is not None:
            spaces[chosen_i] = "^"

        binary_str = "".join(cards)
        print(f"{binary_str} (base 10: {int(binary_str, 2)})")
        print("".join(spaces))

        if chosen_i is not None:
            spaces[chosen_i] = " "


    visualize_turn(cards)
    while facedown_i:
        chosen_i = take_turn()
        visualize_turn(cards, chosen_i)
```

## Interactive Demo
Below you'll find an interactive demo. Once you've solve this simple 8-card version,
you can move on to choosing whatever number of cards you want.

Here is a <a href="{{ page.embedding_path }}" target="_blank">link</a> to a full-page view if you'd prefer.
