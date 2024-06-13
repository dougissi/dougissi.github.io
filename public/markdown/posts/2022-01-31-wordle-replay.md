![Wordle Helper Share Icon](/assets/wordlereplay/wordle_replay_share_icon_1200x600.png)

## [Update June 2024]
I recently overhauled the Wordle Replay tool to use React and Material UI. Check out my [more recent post](/wordlereplay-react) for details.

## Motivation
At the beginning of 2022, a coworker first introduced me to the daily word guessing game called
[Wordle](https://www.nytimes.com/games/wordle/) that was taking the world by storm.
I was intrigued from the very first time I played, which is rare enough since I don't play many games.
That same night I shared the game with my wife and mother-in-law, and when I later discovered that they both had gotten hooked too, I knew that this game was special.

I couldn't help but think that I could make a tool that could help solve these puzzles.
After all, I had been looking for an excuse to improve my web development skills.

## What is Wordle?
The premise is refreshingly simple: each day, guess the secret 5-letter English word in as few tries as possible but no more than 6.

Throughout the whole world, everyone tries to guess the same secret word.
And once you've found it, you have to wait until the next day to play again on the new secret word. If you miss a day, you can't go back and play it.

After each guess, which itself must be a valid 5-letter word, each letter will change to one of three colors:
* green: that particular letter is in the word AND in the correct spot
* yellow: that particular letter is in the word but NOT in the correct spot
* gray: that particular letter is NOT in the word.

If you haven't played, you really ought to [check it out](https://www.nytimes.com/games/wordle/).

## What did I build?
I built the [original version](https://www.dougissi.com/wordle-replay/) of WordleReplay.com with the following features:
* Mimics all of the main Wordle game play functionality
* Stays in sync with the real Wordle as the days go by, so the word for today on WordleReplay.com always matches the word on the official Wordle site.
* **Allows the user to play any Wordle that has been published to date (in contrast to the official Wordle where you cannot play prior days).**
* Provides top suggestions for the user's next guess (more details [below](#next-guess-suggestions)).

## Popularity [Update January 2024]
The original version of WordleReplay.com had become very popular for the two years that it had been in existence. Since late 2023, the site has seen more than 1,000 daily users from users across the globe!

![WordleReplay.com popularity reports 2022 to 2023](/assets/wordlereplay/wordle_replay_popularity_2years.png)

Until finally stopping a couple months ago, I was tracking every guess that placed on the site. We reached over 4,000,000! I never would have thought I'd see a number that high.

![WordleReplay.com 4 million guesses](/assets/wordlereplay/WordleReplay.com_4M_guesses.png)

In case you're curious, here are the most common starting words from among the 4M total guesses.

| Rank | Guess | Percentage |
| ---: | --- | --- |
| 1 | adieu | 5.17% |
| 2 | audio | 3.88% |
| 3 | stare | 2.65% |
| 4 | raise | 2.52% |
| 5 | aeros | 2.18% |
| 6 | slate | 1.88% |
| 7 | crane | 1.62% |
| 8 | arise | 1.62% |
| 9 | arose | 1.38% |
| 10 | irate | 1.24% |
| 11 | salet | 1.16% |
| 12 | roate | 0.96% |
| 13 | soare | 0.95% |
| 14 | train | 0.94% |
| 15 | house | 0.89% |
| 16 | aisle | 0.64% |
| 17 | heart | 0.64% |
| 18 | great | 0.61% |
| 19 | tears | 0.61% |
| 20 | crate | 0.59% |

## Next Guess Suggestions
Originally I though that this guess suggestion feature would be the main draw of the site, but it turns out that people are primarily focused on being able to replay old Wordles. Nevertheless, I had fun making the suggestion feature. Without getting too lost in the details, here is the main logic.

1. Starting with the list of all valid words, calculate the frequency of each letter.
2. Score each word based on the letter frequency (words with more frequently used letters get a higher score).
3. Choose the words with the highest scores (broken out by the number of duplicate letters -- words with fewer duplicates tend to provide more information).
4. Once a user enters a guess, compare the guess with the actual word to get a breakdown of the guess' green/yellow/gray letters.
5. Based on the guess' green/yellow/gray breakdown, remove any words from the valid word list that would be inconsistent with the results of the guess.
6. Restart at step 1.

To be sure, this is not the most sophisticated approach. If you're curious, I suggest you take a look at this [YouTube video](https://youtu.be/v68zYyaEmEA?si=NFoulmXHEqLB-QB-) that uses a method based on information theory.

## Wordle Replay tool
Embedded below is the live version of Wordle Replay. Navigate to [dougissi.com/wordle-replay](https://www.dougissi.com/wordle-replay) for a full-page view. It works well on mobile too.

Enjoy!

![Original Wordle Replay Embedding](embedding/original-wordle-replay)
