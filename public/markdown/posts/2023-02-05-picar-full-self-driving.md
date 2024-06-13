## Motivation

As part of my Master of Computer Science program at the University of Illinois at Urbana-Champaign, during my first semester I took a course called "Internet of Things." For the first lab, we used a [Raspberry Pi](https://www.raspberrypi.com/) (a small computer) and a [car kit](https://docs.sunfounder.com/projects/picar-4wd/en/latest/) which together resulted in a programmable car!

Besides motors, wheels, and batteries, the car also has an ultrasonic sensor that allowed the car to get distance measurements. In the videos below, you'll see that the ultrasonic sensor is on top of a servo at front of the car and periodically goes back and forth to get an idea if anything is in front of the car and at what angle. Additionally, there is a camera mounted on the very front.

## Objective 1 — Roomba

The first task was to allow the car to move like a Roomba (i.e., a self-driving vacuum robot). It had no need of the camera; it only used the ultrasonic sensor to determine if the car was getting close to any other object.

![PiCar Full Self-Driving Embedding](embedding/picar-roomba)

## Objective 2 — Full Self-Driving

The much more challenging task was to make the car have full-self driving capabilities. The only input we were allowed to give the car was something like, "go to the destination that's 5 feet forward and 3 feet to the right", and the car would have to do the rest itself. Not only did it have to create a route to get there, it also had to avoid any obstacles that might be in the way.

Just to make it a bit more realistic, it also had to be able to recognize a stop sign using computer vision technology via its camera. It was great to get a taste of the type of sensors and technologies that the big car manufacturers need to make full self-driving a reality.

If you want some help, Tesla, don't hesitate to give me a call.

![PiCar Full Self-Driving](embedding/picar-full-self-driving)
