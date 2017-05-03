---
title:  "NASA SpaceApps 2017 experience"
categories: 
  - hackathon
tags:
  - hackathon
  - achievements
  - experiences
---

Last weekend, the NASA SpaceApps challenge took place. In particular, I participated in the Zaragoza hub of said challenge. I will try to summarize my experience as best as I can, but *spoiler alert* it was a blast!
{: .text-justify}

First of all, I must say that this was my first SpaceApps experience, but not my first hackaton since in 2016 I participated in the Google Hash Code challenge that was organized in my university. The weekend started with some short briefings about what this year challenges were all about and a quick introduction to some tools that might come handy given the nature of the problems presented.
{: .text-justify}

Luckily, me and my partner (Jorge Martínez) had experience with those tools (QGIS, PostgreSQL and PostGIS), and since we had an idea of what we wanted to do in the first place (NASA publishes what the challenges will be about a few days earlier) and since that idea had nothing to do with those particular tools we were simply enjoying some tips and tricks that were given to us.
{: .text-justify}

The idea that we had in the first place (well, it was actually a really cool idea that Jorge came up with) was to implement a system in 3D with virtual reality to track the incoming asteroids towards Earth and see them in real time as they go past us (we, in this case, would be Earth).
{: .text-justify}

The problem with that idea is that once we started to develop it with the NASA available APIs and documentation, there were some clearly missing data and there was no physical way of doing it properly in the given amount of time (we only had 30 hours). So we decided to switch up.
{: .text-justify}

Luckily Jorge had brought with him an insteresting device that later became key to our success: a Leap Motion. This little device uses 3 infrareds sensors to draw a virtual image of our hand, and we can then use some gestures to control whatever we want. So with this device available, we decided to make a 3D model of Earth, with a lot of layers that gave different information and then control all of this with the Leap Motion device.
{: .text-justify}

So, after many development hours and not so much sleep (although we had some, let's be fair since there were people at the event that literally stayed over night working), our 3DNasa project came to life! We managed to get information available from GIBS to display certain data that we thought might be interesting to the final user: surface temperature, snow surface, etc. All of this with date controls to see the evolution of all the data through time.
{: .text-justify}

The experience itself was amazing, we had options to choose of where to work and we had constant and abundant supplies of water, cookies and pizza! (Shoutout to the event manager Borja Espejo) And I will definitely do my best to try and come back next year.
{: .text-justify}

In the end, our project was blessed with the jury's top award choice (along with another group) and is now in the process of being jugged by a NASA jury that will determine whether we win some cool prizes or whether we stay "simply" as our hub current champions (which is satisfactory already!).
{: .text-justify}

If you need more info about our team and the project you can check it [here](https://2017.spaceappschallenge.org/challenges/ideate-and-create/1d-2d-3d-go/teams/3dnasa/project) and our project github is [here](https://github.com/JorgeCoke/SpaceApps2017).
{: .notice--info .text-justify}
