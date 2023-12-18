---
title: "Turn on all flows"
layout: page
nav_order: 7
parent: The Power Automate Flows
grand_parent: Technical Specifications
---

# Automatically Turn On All Power Automate Flows
{: .no_toc}

## Table of Contents
{: .no_toc}

## The Problem

According to [Microsoft's Documentation](https://learn.microsoft.com/en-us/power-automate/limits-and-config), Power Automate flows automatically turn off after 90 days of inactivity. 

## The Solution

This flow will turn on all the required flows every 3 months, including itself. This ensures that all flows are active, no matter what. (At least hopefully. I'm actually not totally sure that simply "turning on" a flow is enough to reactive it. I assume it is.)

![Flow to turn on all flows]({{ site.baseurl }}/assets/images/powerAutomate/turnOnAllFlows.png)