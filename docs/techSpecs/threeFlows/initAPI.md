---
title: "API: Initialization"
layout: page
nav_order: 2
parent: The Power Automate Flows
grand_parent: Technical Specifications
---

# Initialization Form Has Been Submitted
{: .no_toc}

## Table of Contents
{: .no_toc}

1. Table of Contents
{:toc}


## Purpose

This flow is an automated process that runs after an HTTP POST request is recieved. When the [subcontractor initialization form] is submitted, it contacts this API to submit the data. It process the data recieved and creates the folder structure inside the `submissions` folder. This flow also sends an email to everyone in the email list **and will send a reminder email to everyone in 2 days. (THIS NEEDS TO BE IMPLEMENTED)**

## Overview

## Connections, Triggers, and Actions Used

## Structure

----
[subcontractor inititalization form]: https://tce-innovation.github.io/Subcontractor-Automation/forms/initialization.html