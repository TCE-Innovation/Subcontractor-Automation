---
title: "API: Correction Dropdown"
layout: page
nav_order: 5
parent: The Power Automate Flows
grand_parent: Technical Specifications
---

# Correction Dropdown
{: .no_toc}

## Table of Contents
{: .no_toc}

1. Table of Contents
{:toc}

## Purpose

This flow is an automated process that runs after an HTTP POST request is recieved. This flow is primarily called when the subcontractor opens the link to the [correction form]. Depending on what is included in the POST request, this API will do something different. If `getContract: true` is recieved, then the API will respond with the folder names in the submission folder, regardless of anything else.

If `getContract: false` is recieved, then `getSubcontractors` is searched. If `getSubcontractors` is not null, then it contains a contract number. The flow will retrieve all JSON files inside that contract folder and return that directly. 

This flow was created to implement the dropdown feature in the [correction form], so document controllers can select existing submissions. This cuts down on the potential for misspelling, since we can verify the files that are returned through this API.

Given the following information, the \*\*directory's** contents are returned.

```
getContract: true
getSubcontractors: {Any}


+-- ..
|-- (root)
|-- **submissions**
|   |-- R-33333 (ContractNum)
|   |   |-- JSON
|   |   |   |-- R-33333.json
|   |   |   |-- Subcontractor1.json
|   |   |   |-- Subcontractor2.json
|   |-- A-12345 (ContractNum)
|   |   |-- JSON
|   |   |   |-- R-33333.json
|   |   |   |-- Kangaroo.json
|   |   |   |-- Subcontractor1.json
```

```
getContract: false
getSubcontractors: R-3333


+-- ..
|-- (root)
|-- submissions
|   |-- R-33333 (ContractNum)
|   |   |-- **JSON**
|   |   |   |-- R-33333.json
|   |   |   |-- Subcontractor1.json
|   |   |   |-- Subcontractor2.json
|   |-- A-12345 (ContractNum)
|   |   |-- JSON
|   |   |   |-- R-33333.json
|   |   |   |-- Kangaroo.json
|   |   |   |-- Subcontractor1.json
```

## Flow Diagram

![Power Automate Flow for Subcontractor Autofill API]({{ site.baseurl }}/assets/images/powerAutomate/apiDropDown.png)

## Connections, Triggers, and Actions Used

**Trigger:** [When HTTP Request is recieved](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)

|Connector|Action|
|:-:|:-:|
|[Variable](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/variables)|Initialize Variable <br> |
|[Data Operation](https://learn.microsoft.com/en-us/power-automate/data-operations) | Parse JSON <br> Compose|
|[SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/)| Get File Content Using Path <br> Create File|
|[Control](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference) |  [Apply to each](https://learn.microsoft.com/en-us/power-automate/apply-to-each) <br> [Condition](https://learn.microsoft.com/en-us/power-automate/use-expressions-in-conditions)|
|[HTTPS call](https://learn.microsoft.com/en-us/azure/connectors/connectors-native-reqres)|When a HTTP request is recieved <br> Response|
|[Outlook](https://learn.microsoft.com/en-us/power-automate/email-overview)|Send an Email (V2)|

----
[correction form]: https://tce-innovation.github.io/Subcontractor-Automation/forms/correction.html