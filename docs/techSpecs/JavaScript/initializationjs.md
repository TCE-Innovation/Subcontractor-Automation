---
title: Initialization JavaScript File
layout: default
parent: JavaScript Control
grand_parent: Technical Specifications
nav_order: 1
---

## Table of Contents 
{: .no_toc}

1. TOC
{:toc}


# UML Diagram
![]({{ site.baseurl }}/assets/images/umlDiagrams/initializationjs.png)

# Functions

## autopopulateGenInfo()

**Description:** A replica of the same from the Subcontractor javascript file, this one prefills any information that is knonw to be true and correct. It autofills from the *prefilled* parameter, and only has one item (Which can be added onto later).

It currently contains:
```js
preconfigured = {
	"sc.GI.federallyFunded": "Yes"
};
```

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.

# sendData

## interactWithAPI()

**Description:** Calling this function will send the provided objects to the URL given and returns the response of the server.

**Parameters:** 
- @param {Object} data: THe data to be sent to the API, given as a javscript option.
- @param {String} url: The string URL of the API that we are interfacing with.

**Returns:** 
- @returns {Promise}: Resolves with the JSON data

## getFormData()

**Description:** Returns form data as a plumsail native object. The only code run here is fd.data().

**Parameters:** null

**Returns:** 
- @returns {Object} Returns the form data in a plumsail native object.

## init()

**Description:** The public facing function. This simply calls interactWithAPI() to do work for them. Will send data to the api. 

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.

## extractData()

**Description:** Extract all the values in a column in a data table and return it as an array. Useful when extracting columns, such as email lists. 

**Parameters:** 
- @param {String} dt: Internal name of the data table.
- @param {String} col: Internal name of the column within the data table. 

**Returns:** 
- @returns {Array} Array contains all the values of the column specified.

# validation

## getDataTables()

**Description:** Gets a list of all the data tables in form. Will apply this validation to all data tables.

**Parameters:** null

**Returns:** 
- @returns {Array} All internal names on the form that have `dt.`

## init()

**Description:** Applies all the validation necessary to the data tables after first extracting all the data tables from the forms.

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.

## completeTableValidator
**Description:** The two functions in here make up the validator: one sets up the validator while the other actually checks when if the data table is filled.

### completeTableValidator.add()

**Description:** Adds the "Fill out data table completely" validator. Uses *isDTFilled()* to check.

**Parameters:** 
- @param {Array} dtArray: An array of all data tables in the code.

**Returns:** 
- @returns {Bool}: True if the condition is met, false if the user needs to correct somthing. Generated from *isDTFilled()*

### completeTableValidator.isDTFilled()

**Description:** Loops through each and every one of the cells in a data table and checks for an empty slot. If none of the slots are empty, then we have a complete data table. Return true/false.

**Parameters:**
- @param {String} dtName: Interal name of the data table to read and record the value.

**Returns:** 
- @returns {Bool}: True if the condition is met, false if the user needs to correct somthing. Generated from *isDTFilled()*.

## columnValidators()

**Description:** In this case, a validator is used for verifying that email addresses are in the valid format. Will apply formatting to any internal column name with `email`.

**Parameters:** null

**Returns:** 
- @returns {Bool}: Returns the result of a regex test.