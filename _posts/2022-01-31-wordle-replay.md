---
layout: post_with_embedding
title: Wordle Replay
tags: [Strategy]
embedding_path: https://www.wordlereplay.com/
---
![Wordle Helper Share Icon]({{ page.embedding_path}}assets/images/wordle_replay_share_icon_1200x600.png)

## Motivation
At the beginning of 2022, a coworker first introduced me to the daily word guessing game called
<a href="https://www.nytimes.com/games/wordle/" target="_blank">Wordle</a> that was taking the world by storm.
I was intrigued from the very first time I played, which is rare enough since I don't play many games.
That same night I shared the game with my wife and mother-in-law, and when I later discovered that they both had gotten hooked too, I knew that this game was special.

I couldn't help but think that I could make a tool that could help solve these puzzles.
After all, I had been looking for an excuse to improve my web development skills.

## What is Wordle?
The premise is refreshingly simple: guess the secret 5-letter English word in as few tries as possible but no more than 6.

Throughout the whole world, everyone tries to guess the same secret word.
And once you've found it, you have to wait until the next day to play again on the new secret word.

After each guess, which itself must be a word in the Wordle game's word list, each letter will change to one of three colors:
* green: that particular letter is in the word AND in the correct spot
* yellow: that particular letter is in the word but NOT in the correct spot
* gray: that particular letter is NOT in the word.

If you haven't played, you really ought to <a href="https://www.nytimes.com/games/wordle/" target="_blank">check it out</a>.

## What did I build?
I ended up building what I've called <a href="{{ page.embedding_path }}" target="_blank">Wordle Replay</a> with the following features:
* stays in sync with the real Wordle as the days go by (i.e., refreshes at midnight of the timezone of each user)
* provides what it considers to be the top suggestions for the user's next guess.
* allows the user to play a Wordle from any day in the past.

## Suggesting the top next guesses
Without getting too lost in the details, this is how I implemented the feature that suggests the next top guesses.

1. Starting with the list of all valid words, calculate the frequency of each letter.
2. Score each word based on the letter frequency (words with more frequently used letters get a higher score).
3. Choose the words with the highest scores (broken out by the number of duplicate letters -- words with fewer duplicates tend to provide more information).
4. Once a user enters a guess, compare the guess with the actual word to get a breakdown of the guess' green/yellow/gray letters.
5. Based on the guess' green/yellow/gray breakdown, remove any words from the valid word list that would be inconsistent with the results of the guess.
6. Restart at step 1.

## Wordle Replay tool
Embedded below is the live version of Wordle Replay. Navigate to <a href="{{ page.embedding_path }}" target="_blank">wordlereplay.com</a> for a full-page view. It works well on mobile too.

Enjoy!
