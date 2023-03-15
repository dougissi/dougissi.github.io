---
layout: post_with_embedding
title: Square Root Implementation
tags: [Binary Search]
embedding_path: /assets/square_root/Nth_Root.html
---

## Motivation
During the final stage of a three-part technical interview for Senior Software Engineer position at a publicly traded software company in Silicon Valley, the interviewer posed a question to me that caught me completely off guard:

> Implement a Python function that calculates the square root of a non-negative number WITHOUT making use of fractional exponents (i.e., `x ** 0.5`)

I felt the panic rise in my chest because `x ** 0.5` is _the way_ to calculate a square root with Python out in the wild. My anxiety was only exacerbated by the fact that I had majored in mathematics at Stanford University, and yet apparently _I didn't know any clever way to calculate a square root_. 

Sure, if you gave me the number `25`, I could tell you that the square root was `5`, but if the number you gave me wasn't a perfect square (that I actually knew), then I was up a creek. And even then, just because _I_ knew that `5` is the square root of `25` didn't mean that I could write a function to figure it out.

The interviewer gave me some hints that got me on the right track, but it took me a long time to get to a solution, and even then it was an imperfect one. My heart sank a little more when he then asked me how I could generalize my solution to solve not just the _square_ root but instead the _nth_ root, because I couldn't see an immediate path for such a generalization. 

Suffice it to say, I didn't get the job, but I couldn't help but feel that they had asked me a great question; a question that a math-major-turned-software-engineer simply had to be able to solve.

Today, more than a year later, I finally got my act together and took the time to find a good solution, and I share it with you all now with the hopes that it likewise helps you on your journey.

## Hint

I don't remember the interviewer's exact hint now, but essentially it went something like this: "Talk me through how you would calculate the square root of 8 on a calculator without using the square root button?"

At first this didn't help, because I still didn't know. Eventually I admitted that essentially I have to just start guessing, which from a mathematician's point of view is basically never the correct answer. Nevertheless, the interviewer encouraged this line of thinking and asked what I would guess first.

I told him that I "knew" that it couldn't be more than half of 8, namely 4. But 4 itself was clearly too big (since 4 ^ 2 = 16), so I'd try 3 next. But even then, 3 was still too big (since 3 ^ 2 = 9), so I'd then try 2 next. But 2 is too small, so I knew that the square root of 8 was somewhere between 2 and 3. So I could just keep trying values until I eventually narrowed in on the precise value of the square root of 8.

But there's a more optimal guessing strategy. Let's discuss a fundamental concept that will help us uncover it.

## Fundamental Concept: Binary Search

Suppose we randomly selected 100 numbers, each between 1 and 100,000. If we want to know if the number 834 happens to be among our randomly selected numbers, we'd be forced to scan through each number one at a time until we found one that matched 834. If we didn't find it, that would imply we had scanned through all 100 numbers without success. Likewise, if we later wanted to find out if 90151 was among the numbers (assuming we couldn't remember from the first pass through), we would have to repeat the process, and in the worst case we might have to look through all 100 numbers again.

However, if we had instead spent some time initially to _sort_ our numbers from least to greatest, we would put ourselves at a great advantage. We could first check the middle element, and if it wasn't 834, then we could check to see the middle number was larger or smaller. If it was larger, then we would know that 834 could only possibly be in the first half of the numbers, since the numbers are in order. Likewise if the middle number was smaller than 834, then we would know that it could only possibly be in the second half of our numbers. In either case, we would be able to exclude half of the numbers. We could then repeat this process for the remaining numbers by looking at the middle number what remains, and if 834 wasn't found, at least we'd be able to decrease the pool in half again. Continuing on in this manner, we'd either find the number or end up with no numbers remaining after just 7 rounds, which is a tremendous improvement over potentially needing to look through all 100 numbers.

Even more impressive would be that if we bumped up our number of elements from 100 to 1000, using this binary search method would guarantee that we could determine if 834 was in our group of 1000 in just _10 rounds_.

While stated without proof, we can determine this worst case by rounding up to the nearest integer of the log2 ("log base 2") of the number of elements we're searching through. So if there were 10,000 elements, we'd only need at most 14 rounds, which is nearly lightspeed compared to perhaps needing to look through all 10,000 elements as in the unordered case.

## Putting It All Together

So what does binary search have to do with calculating the square root (or nth root) of a number?

Well, conveniently for all numbers `x` greater than 1, we know that the nth root is going to fall somewhere between 0 and `x` (technically between 1 and `x` but not a huge deal). Since this range is clearly _ordered_, instead of simply guessing sequentially, we can guess in a similar manner to the binary search method described above.

Let's go back to the example of finding the square root of 8. We could start in the middle, which is 4. Since 4 is too big, we could eliminate everything greater than 4, meaning it must be something between 0 and 4 (yes, technically between 1 and 4, but again, not a big difference). At that point we could try the new middle, namely 2. Since 2 is too small, we would know that it's something larger, namely something between 2 and 4. So we'd guess 3. But 3 is too large, so could try something between 2 and 3. So we'd guess 2.5, but it's too small, so we'd move on to 2.75, and so on until we finally narrow in on (approx) 2.82842712474619.

And wouldn't you know, this exact approach also works for finding the generalized nth root in addition to the square root.

## Edge Case

In the edge case where `x` is between 0 and 1, we can adjust the initial conditions because we know that the nth root is going to be between `x` and 1 (i.e., larger than `x` but less than 1) because the product of two numbers `a` and `b` that are both between 0 and 1 produce a smaller number than both `a` and `b`. Said another way, we know that the nth root of a decimal number is going to be a _larger_ decimal, somewhat non-intuitively.

## Solution

```
def nth_root(x: float, n: int):
    """Calculate the nth root of x""" 
    
    if x < 0:
        raise NotImplemented("not implemented for negative values")
    if n < 0:
        raise NotImplemented("not implemented for negative root values")
        
    if x == 0 or x == 1:
        return x
    
    guess = x / 2
    prev_guess = None
    
    if x > 1:
        smallest_guess_too_big = x
        largest_guess_too_small = 0
    else:  # x < 1
        smallest_guess_too_big = 1
        largest_guess_too_small = x
    
    guess_nth_power = guess ** n 
    
    while (guess_nth_power != x and guess != prev_guess):
        if guess_nth_power > x:
            smallest_guess_too_big = guess
            prev_guess = guess
            new_guess = (largest_guess_too_small + guess) / 2
        else:
            largest_guess_too_small = guess
            prev_guess = guess
            new_guess = (guess + smallest_guess_too_big) / 2
            
        guess_nth_power = new_guess ** n
        guess = new_guess
        
    return guess
```

## Solution with Visuals
Embedded below is the Python 3 code in a Jupyter Notebook with additional graphical elements to demonstrate what is happening in the `nth_root` function. Navigate <a href="{{ page.embedding_path }}" target="_blank">here</a> for a full-page view.

Enjoy!
