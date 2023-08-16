---
title: Correction JavaScript File
layout: default
parent: JavaScript Control
grand_parent: Technical Specifications
nav_order: 3
---

## Table of Contents 
{: .no_toc}

1. TOC
{:toc}

# UML Diagram
![]({{ site.baseurl }}/assets/images/umlDiagrams/correctionjs.png)

# dataHandling

## getContracts()

**Description:** Utilizes the *interactWithAPI()* method to pull all available contract numbers (That is, all the folder names in the *Submission* folder). The API will return an array of objects: we need to specifcally extract the title. Used to autopopulate the dropdown `dd.GI.contractNo`

**Parameters:** null

**Returns:** 
- @returns {Array}: When the promise is resolved, will loop and extract the titles of all the objects returned. WIll return an array of folder names.

## getSubcontractors()

**Description:** Utilizes the *interactWithAPI()* method to pull all available subcontractors, given a selected contract number. (That is, all the file names in the [ContractNumber] folder). The API will return an array of objects: we need to specifcally extract the title. Used to autopopulate the dropdown `dd.GI.subcontractorName`

**Parameters:** null

**Returns:** 
- @returns {Array}: When the promise is resolved, will loop and extract the titles of all the objects returned. WIll return an array of file names.

## submitData()

**Description:** Prepares the data for submission, using both fd.data() and some additional post processing. Then, submits using the `interactWithAPI()` method. I did the post processing here in JS before sending because I prefer JS over PA. 

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.

## interactWithAPI()


**Description:** 

**Parameters:** 
- @param {Object} data: Contains the json data to send to the API
- @param {String} url: URL of the Power Automate Flow

**Returns:** 
- @returns {Promise}: Resolves with the JSON data fetched from the API

## externalFile()

**Description:** This async function prepares the datatable `Editable Items` with the drop down data necessary to complete this form. This data must be loaded for everything else to work, so it is built as a fetch/then method due to network latency.

Everytime the datatable is *edited* (A user has begun to edit a cell), it will update the first and second columns. 

Everytime the datatable has *changed* (A value has offically been selected by the user), this function will update the last column. 

The two-step change/edit is used to ensure that the selection is valid. If the selection is invalid, the third row will not show up. Third row fill is checked using `dataTableFunctions.checkColumn3FIlled()`

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.


# dataTableFunctions

## checkColumn3FIlled

**Description:** Loops through the data table [editableItems] and verifies that column 3 is filled. 

**Parameters:** null

**Returns:** 
- @returns {int} Returns the number of unfilled cells. If totally full, returns 0;

## populateColumn()

**Description:** Populate the dropdown options in a data table with a given array of values. See https://plumsail.com/docs/forms-web/designer/controls/datatable.html#populate-dropdown-column-options for more information.

**Parameters:** 
- @param {Object} widget: Specifies the widget. See documentation linked above.
- @Param {Any} value: Previous Value.
- @param {Array} arrayName: The array containing the data to populate dropdown column.


**Returns:** 
- @returns {void} This function does not return any value.

## disableLastColumn()

**Description:** Disables the last column on the `editable Items` data table (DataTable1). This column is not user editable.

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.

## extractData()

**Description:** This function will extract all the values in a column in a data table and return it as an array

**Parameters:**
- @param {String} dt: Internal name of the data table
- @param {String} col: Internal name of the column in the data table

**Returns:** 
- @returns {Array} Returns an array of all the column values.