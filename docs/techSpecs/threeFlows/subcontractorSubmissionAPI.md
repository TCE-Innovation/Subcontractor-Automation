---
title: "API: Subcontractor Submission"
layout: page
nav_order: 4
parent: The Power Automate Flows
grand_parent: Technical Specifications
---

# Subcontractor Form has been completed
{: .no_toc}

## Table of Contents
{: .no_toc}

1. Table of Contents
{:toc}

## Purpose
Once the subcontractor form is submitted, it will send an API POST request to this flow. The POST request will contain an object with data from the form, which will be parsed for subcontractor name and contract number. A file is then created accordingly.

Given the following information, the file with ** is the created file.

```
contractNum: A-12345
subName: Kangaroo

+-- ..
|-- (root)
|-- submission
|   |-- R-33333 (ContractNum)
|   |   |-- JSON
|   |   |   |-- R-33333.json
|   |   |   |-- Subcontractor1.json
|   |   |   |-- Subcontractor2.json
|   |-- A-12345 (ContractNum)
|   |   |-- JSON
|   |   |   |-- R-33333.json
|   |   |   |-- **Kangaroo.json**
|   |   |   |-- Subcontractor1.json
```

## Flow Diagram

![Power Automate Flow for Subcontractor Submission API]({{ site.baseurl }}/assets/images/powerAutomate/apiSubSubmission.png)

## Connections, Triggers, and Actions Used

**Trigger:** [When HTTP Request is recieved](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)

|Connector|Action|
|:-:|:-:|
|[Variable](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/variables)|Initialize Variable <br> |
|[Data Operation](https://learn.microsoft.com/en-us/power-automate/data-operations) | Parse JSON|
|[SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/)| Get File Content Using PATH|
|[HTTPS call](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)|When a HTTP request is recieved <br> Response|