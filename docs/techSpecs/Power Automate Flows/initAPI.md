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

This flow is an automated process that runs after an HTTP POST request is recieved. When the [subcontractor inititalization form] is submitted, it contacts this API to submit the data. It process the data recieved and creates the folder structure inside the `submissions` folder. This flow also sends an email to everyone in the email list **and will send a reminder email to everyone in 2 days. (THIS NEEDS TO BE IMPLEMENTED)**

{: .note }
This flow mail fail due to a undelivered HTTP response. This doesn't matter - as long as the emails and such are sent.

## Overview

After being triggered, it runs the following:
1. Read data from the Form
2. Create a folder in the submissions directory using the file structure listed below
3. Creates a file in a subfolder called JSON in that directory with the same contract number as its filename.
4. Loops through all the subcontractors listed and sends them an email indicating to complete the forms. 

### File Structure

```
+-- ..
|-- (root)
|-- submission
|   |-- ContractNum (R-33333)
|   |   |-- JSON
|   |   |   |-- ContractNum.json (R-33333)
```

## Connections, Triggers, and Actions Used

**Trigger:** [When HTTP Request is recieved](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)

|Connector|Action|
|:-:|:-:|
|[Variable](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/variables)|Initialize Variable <br> |
|[Data Operation](https://learn.microsoft.com/en-us/power-automate/data-operations) | Parse JSON <br> Compose|
|[SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/)| Create new Folder <br> Create File|
|[Control](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference) |  [Apply to each](https://learn.microsoft.com/en-us/power-automate/apply-to-each) <br> [Condition](https://learn.microsoft.com/en-us/power-automate/use-expressions-in-conditions)|
|[HTTPS call](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)|When a HTTP request is recieved <br> Response|
|[Outlook](https://learn.microsoft.com/en-us/power-automate/email-overview)|Send an Email (V2)|

## Flow Diagram

![Power Automate Flow for Initialization API]({{ site.baseurl }}/assets/images/powerAutomate/apiInit.png)

----
[subcontractor inititalization form]: https://tce-innovation.github.io/Subcontractor-Automation/forms/initialization.html