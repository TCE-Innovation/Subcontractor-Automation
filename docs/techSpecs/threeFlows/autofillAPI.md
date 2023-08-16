---
title: "API: Subcontractor Autofill"
layout: page
nav_order: 3
parent: The Power Automate Flows
grand_parent: Technical Specifications
---

# Subcontractor Autofill
{: .no_toc}

## Table of Contents
{: .no_toc}

1. Table of Contents
{:toc}

## Purpose

This flow is an automated process that runs after an HTTP POST request is recieved. This flow is primarily called when the subcontractor opens the link. The URL parameters `contractNum` and `subName` are required to be submitted to this API. Using that information, the correct folder/file pair is sourced from the `submissions` folder, and all the data within that is sent back via the response. 

The file contains all the form data with previously submitted data. It is also used to extract known good information from JSON files with the contract number. 

Given the following information, the file with ** is the selected file.

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

![Power Automate Flow for Subcontractor Autofill API]({{ site.baseurl }}/assets/images/powerAutomate/apiAutofill.png)

## Connections, Triggers, and Actions Used

**Trigger:** [When HTTP Request is recieved](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)

|Connector|Action|
|:-:|:-:|
|[Variable](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/variables)|Initialize Variable <br> |
|[Data Operation](https://learn.microsoft.com/en-us/power-automate/data-operations) | Parse JSON|
|[SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/)| Get File Content Using PATH|
|[HTTPS call](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)|When a HTTP request is recieved <br> Response|