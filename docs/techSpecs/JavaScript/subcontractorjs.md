---
title: Subcontractor JavaScript File
layout: default
parent: JavaScript Control
grand_parent: Technical Specifications
nav_order: 2
---

# UML Diagram
![](/assets/images/umlDiagrams/subcontractorjs.png)

# data

{: .note }    
> When first starting to build this program, I spaghetti coded most of it. While functional, understanding it became a nightmare. Thus, in an attempt to beautify the code a little, I created classes that would house the most important information. 
>
> Data is one such class that never got made. All the functinons that should be inside data are hanging around loosey goosey as pure javascript functions(). For all intents and purposes, imagine them as a class.

## executeOnce

**Description:** Call the functions to autopopulate and initalize the forms with all event listeners and validators.

**Parameters:** null

**Returns:** null


## getKnownInfo

**Description:** Get URL parameters and send them to the API to get the autofill data.

**Parameters:** null

**Returns:** 
- @returns {Promise}: Resolves with the JSON data

## apiInteraction

**Description:** 

**Parameters:** 
- @param {Object} contract: Contains the json data to send to the API
- @param {String} url: URL of the Power Automate Flow

**Returns:** 
- @returns {Promise}: Resolves with the JSON data fetched from the API

## autoPopulate

**Description:** Autopopulate all elements of the form wih known information from `getKnownInfo()`. If the information is autopopulated, then disable the fields, except when included in the array `editableItems`, which is included in the recieved JSON file.

**Parameters:** null

**Returns:** null


# Event Listener

# dataTableFunctions

## isDTFilled

**Description:** Will check to see if there is an empty cell in the data table given. If there is an empty cell, return a false. This is meant to be used in conjunction with a validator.

**Parameters:** 
- @param {String} dtName: The Internal name of the data table.

**Returns:**
- @returns {Bool}: True if the data table is filled, false if there is an empty cell.

## rowValidators

**Description:** Adds a validator to all data tables to completely fill out the data table without gaps. Also adds the validator limiting and mandating the number of entries for the following data tables.
- "dt.SB.P5.K.1.contractsCompletedLast3Yrs"
- "dt.SB.P5.K.4.activeGovtEntityContracts"
- "dt.SQS.11.refs"
- "dt.OCIP.FB.S2.WCPremium"

**Parameters:** null

**Returns:** null

## validateFormattingDT

**Description:** Adds a validator to ensure proper formatting of emails, phones, contract numbers, and EIN/TIN/SSN. This is applied to all columns with their respective internal names.

**Parameters:** null

**Returns:** null

## calculateOCIPBValues

**Description:** 

**Parameters:** null

**Returns:** null

## calculateOCIPBInsurance

**Description:** 

**Parameters:** null

**Returns:** null

## calculateOCIPBWCPremium

**Description:** 

**Parameters:** null

**Returns:** null

## rmsaRefNum

**Description:** 

**Parameters:** null

**Returns:** null

## disableFields

**Description:** 

**Parameters:** null

**Returns:** null

## setNamesOfDT

**Description:** 

**Parameters:** null

**Returns:** null

## addValidators

**Description:** 

**Parameters:** null

**Returns:** null

## initialize

**Description:** 

**Parameters:** null

**Returns:** null

# attachmentFunctions

## findFields()

**Description:** Searches the internal name for all fields that begin with an `a.`, our internal name signifier for an attachment

**Parameters:** null

**Returns:** null

## validator()

**Description:** Adds the "Only one" attachment validator to all the attachments in "attachmentFields"

**Parameters:** null

**Returns:** null

## initialize()

**Description:** Initializes all the attachments to only have one attachment. To be called from the outside world.

**Parameters:** null

**Returns:** null