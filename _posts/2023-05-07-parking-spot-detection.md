---
layout: post
title: Parking Spot Detection Prototype with 3 Cameras
tags: [Internet of Things]
---

![parking spot detection prototype](/assets/images/parking_spot_detection_prototype.jpg)

## Motivation

Over the two years I lived in San Francisco, my anger at not being able to reliably find parking grew to such a degree that became was one of my top three motivators in wanting to move away. Whether it was at the grocery store, or grabbing a burrito in the Mission District, or trying to go a Golden State Warriors game, or even outside of my own house, I ran into parking challenges essentially everywhere I turned.

All of us who drive on a regular basis have felt the pain of finding parking at one point or another. Perhaps you can relate.

While I am not so bold as to attempt to “solve the parking problem” in its entirety, the ubiquity of the problem motivated me to use my capstone project for the Internet of Things course at UIUC to work toward alleviating at least some of this parking pain.

Seeing as I no longer live in San Francisco but instead about 40 miles south, I decided to focus particularly on my current archnemesis in the parking realm: Costco. For those who are not familiar, it is a large consumer-wholesaler that attracts huge crowds each day. Finding a parking spot during the busy times can be nearly impossible despite the vastness of its parking lot. It has been known to make grown men cry.

Speaking more generally, finding a parking spot in a large, busy parking lot is hard for many reasons.
* There are few spots for many spot-seekers.
* There is a lot of congestion within the driving lanes due to both cars and pedestrians, slowing down the traffic flow.
* The spots closest to the entrance typically are the most highly valued, accentuating congestion in these areas.
* The many parked cars block the line of sight to neighboring aisles, meaning that there may be open spots nearby that go undetected. This phenomenon is all the more true in a multi-level parking garage because drivers cannot see through the floor.

These challenges have negative consequences on the individual drivers. It often takes more time to find a parking spot, perhaps making them late. There is likely a higher chance of vehicular damage and physical injury. These situations would likely cause an individual’s stress level to go up, increasing the likelihood of confrontations of various forms.

The difficulty of finding a parking spot is not just hard on the _drivers_ but also on the _business owners_. For example, if the business sells consumer goods (as is the case with Costco), then the shoppers may have less time to shop and therefore purchase less. Furthermore, these time-pressed, stressed shoppers may be more likely to have unhappy interactions within the busy store (since a busy parking lot would imply a busy store). Taken together, if these negative experiences are bad enough and/or frequent enough, the shoppers may be less inclined to return, which could hurt future revenue for the business.


## Proposed Solution

**Atop the pre-existing lights throughout the parking lot, affix a network of cameras employing computer vision to detect open parking spots and stream this information from all cameras to a cloud-based system that synthesizes it into a single graphical representation that is publicly accessible via web and mobile apps.**

The parking challenges and subsequent negative consequences would be greatly mitigated if the drivers had access to such parking spot detection system. They would have access to the real-time information of which spots where open as they approached the parking lot, allowing them to navigate directly to open spots that are free of congestion. If congestion is unavoidable, drivers would be alerted when a parking spot opens nearby that they would not be able to see otherwise. The decreased congestion from people being able to find spots faster would, in turn, allow people to leave more efficiently and decrease congestion even more. This solution would be good for everyone involved, both the individual drivers and the business owners.

## Demo

I won't get into all of the technical details here, but I do want to share a video demonstration of my first prototype. Enjoy!

And Costco, feel free to reach out to me.

<iframe width="560" height="315" src="https://www.youtube.com/embed/f4gAlq0qjvo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>