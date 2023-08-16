---
title: Subcontractor JavaScript File
layout: default
parent: JavaScript Control
grand_parent: Technical Specifications
nav_order: 2
---

## Table of Contents 
{: .no_toc}

1. TOC
{:toc}

# UML Diagram
![]({{ site.baseurl }}/assets/images/umlDiagrams/subcontractorjs.png)

# data

{: .note }    
> When first starting to build this program, I spaghetti coded most of it. While functional, understanding it became a nightmare. Thus, in an attempt to beautify the code a little, I created classes that would house the most important information. 
>
> The class [data] is one such class that never got made. All the functinons that should be inside data are hanging around loosey goosey as pure javascript functions(). For all intents and purposes, imagine them as a class.

## executeOnce()

**Description:** Call the functions to autopopulate and initalize the forms with all event listeners and validators.

**Parameters:** null

**Returns:** 
- @returns {void} This function does not return any value.


## getKnownInfo()

**Description:** Get URL parameters and send them to the API to get the autofill data.

**Parameters:** null

**Returns:** 
- @returns {Promise}: Resolves with the JSON data

## apiInteraction()

**Description:** 

**Parameters:** 
- @param {Object} contract: Contains the json data to send to the API
- @param {String} url: URL of the Power Automate Flow

**Returns:** 
- @returns {Promise}: Resolves with the JSON data fetched from the API

## autoPopulate()

**Description:** Autopopulate all elements of the form wih known information from `getKnownInfo()`. If the information is autopopulated, then disable the fields, except when included in the array `editableItems`, which is included in the recieved JSON file.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

# Event Listener

## showHideInClass()

**Description:** This function is the main bread and butter of this form. When called, it will check the value of the parameter `fieldName` against the string/array provided in `showValue`. If they match, then the field will be shown and required. If they don't match, its value will be hidden and unrequired. 

The requirement can be adjusted by using the parameter `changeIfRequired`. When set false, the items being shown wont change in requirement. 

Items in the parameter `dontChangeRequired` will never be set required on this functions call.

This function makes use of [setRequiredInClass]{#setRequiredInClass()}

**Parameters:**
- @param {String} fieldName: The internal name of the field to be check against
- @param {String/Array} showValue: Can be of type string or array. Will check the value of the field against this value(s).
- @param {String} className: The name of the class to show/hide.
- @param {Bool} [changeIfRequired = true]: Items being hid will automatically unrequired. Vice versa for items being shown.
- @param {Array} \[dontChangeRequired = [\] \]: Items whos requirement should not be changed upon hiding/showing. Used for optional fields, or fields that will be required later on.

**Returns:**
- @returns {void}: This function does not return any value.

## eventListenerHelper()

**Description:** eventListenerHelper() helps to set up the event listeners by applying the same callback function to an array of field names whose change should require an event to occur. 

**Parameters:**
- @param {Array} arrayOfEvents: Contains all the internal names of the fields that should trigger the callback function
- @param {Callback} callbackFcn: The function that will handle the event change.

**Returns:**
- @returns {void}: This function does not return any value.

## setRequiredInClass()

**Description:** setRequiredInClass() changes the requirements of fields and controls inside a given css class. The parameter `requiredOrNot` dictates the requirement of the field/control after the function has run. The array parameter `arrDontChange` contains the internal names of the fields/controls which will never be required when this function is run.

This uses the **hide using class** technique in [Javascript Control]({% link docs/techSpecs/javascript.md %})

{: .note }
>I don't actually know what how the following conditional works, I just know that it does. I got it from the linked forum post
>```js
>field.$el.closest("." + name) != null
>```
>https://community.plumsail.com/t/disable-all-fields-in-a-grid-container/10249/2

**Parameters:**
- @param {Bool} requiredOrNot: If set true, the field/control will be set true. Vice versa for false.
- @param {String} name: The css class name.
- @param {Array} arrDontChange: An array containing the internal names of the fields/controls which will never be required when this function is run.

**Returns:**
- @returns {void}: This function does not return any value.

## fieldVisAndReq()

**Description:** This is the sister function to [showHideInClass()]{#showHideInClass()}. Instead of using the class based method, we use the **Hide Using Method** technique discussed in [Javascript Control]({% link docs/techSpecs/javascript.md %}). It toggles/hides individual fields.

**Parameters:**
- @param {String} fieldName: The internal name of the field to be affected.
- @param {Bool} requiredOrNot: If set true, the field/control will be shown/required. Vice versa for false.
- @param {String} dataTableOrField: datatable specifies it belongs to the control group, field suggests it belongs to the field group. For more information about this, see the **Form Manager** section of [Javascript Control]({% link docs/techSpecs/javascript.md %})

**Returns:**
- @returns {void}: This function does not return any value.

## init()

**Description:** Initialize all the event listeners for each of the different forms. Since each form gets its own callback function, this needs to be called for each individual function. Schedule B is long enough to have to be split into 5 parts.

Also sets up the validators and hides the percentage field on the general information tab. 

**Parameters:** null

**Returns:**
- @returns {void}: This function does not return any value.

## genInfoValidator()/OCIPAValidator()

**Description:** Adds an event listener that compares two dates to verify expiration after start.

**Parameters:** null

**Returns:**
- @returns {void}: THis funciton does not return any value.

## toggleSQS()/togglePDF()/toggle...()

**Description:** toggle...() applies to all methods prepended with "toggle", including the generalInfoCallback() function. These functions are the hardcoded representations of the forms. THey utilize the helper functions also in event listener to show, hide, require and check responses on thei own individual forms. 

**Returns:**
- @returns {void}: THis funciton does not return any value.

# dataTableFunctions

## isDTFilled()

**Description:** Will check to see if there is an empty cell in the data table given. If there is an empty cell, return a false. This is meant to be used in conjunction with a validator.

**Parameters:** 
- @param {String} dtName: The Internal name of the data table.

**Returns:**
- @returns {Bool}: True if the data table is filled, false if there is an empty cell.

## rowValidators()

**Description:** Adds a validator to all data tables to completely fill out the data table without gaps. Also adds the validator limiting and mandating the number of entries for the following data tables.
- "dt.SB.P5.K.1.contractsCompletedLast3Yrs"
- "dt.SB.P5.K.4.activeGovtEntityContracts"
- "dt.SQS.11.refs"
- "dt.OCIP.FB.S2.WCPremium"

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## validateFormattingDT()

**Description:** Adds a validator to ensure proper formatting of emails, phones, contract numbers, and EIN/TIN/SSN. This is applied to all columns with their respective internal names.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## calculateOCIPBValues()

**Description:** Sets up the event listener to perform calculations and autopopulate specific fields in the form related to the OCIP B Section II data table. 

 The function contains two main parts: 
1. Autopopulate Premium Row in OCIP B Section II insurance premium: When the data in the "dt.OCIP.FB.S2.insurancePremium" control changes (i.e., a new record is added or modified in the data table), this part of the function calculates the "colnumOCIPFB2insurancePremiumPremium" field value for each row in the data table. It uses [calculateOCIPBInsurance]{#calculateOCIPBInsurance()} to do that.

2. Autopopulate premium column in OCIP B Section II WC premium: When the data in the ""dt.OCIP.FB.S2.WCPremium" get changed, the premium row updates. It uses [calculateOCIPBWCPremium]{#calculateOCIPWCPremium()} to do that.

{: .note }
Relistically, this paticular event listener should be in the event listener class, but when I first programmed it, I didn't realize that the callback functions passed through the event listener used the `.value` as a parameter that could just be called. 

```js
fd.control("dt.OCIP.FB.S2.insurancePremium").$on('change', function(value){
    //I always called it like this with value just given from the callback function
    self.calculateOCIPBInsurance(value);
    //I didn't know I could just insert the full chain like this. 
    self.calculateOCIPBWCPremium(fd.control("dt.OCIP.FB.S2.WCPremium").value);
});
```

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## calculateOCIPBInsurance()

**Description:** The calculate OCIPB Insurance completes step 1 in [calcualteOCIPBValues]{#calculateOCIPBValues}. 

There are 3 parts:

1. Loop through the data table and calcualte the premium for each of the rows
2. Total all the values for Work Hours, Limited Payroll, and Premium Total. Then, use these to populate the outside fields.
3. Call the [eventListener.toggleOCIPB]{#toggleOCIPB} to finish off calculating the total premium using the multipler provided by the subcontractor.

**Parameters:** 
- @param {any} value: The value of the field/container driving the event.

**Returns:**
- @returns {void} This function does not return any value.

## calculateOCIPBWCPremium()

**Description:** The calculate OCIPB Insurance completes step 2 in [calcualteOCIPBValues]{#calculateOCIPBValues}. 

There are 3 parts:

1. Loop through the data table and calcualte the premium for each of the rows
2. Total all the values for Work Hours, Limited Payroll, and Premium Total. Then, use these to populate the outside fields.
3. Call the [eventListener.toggleOCIPB]{#toggleOCIPB} to finish off calculating the total premium using the multipler provided by the subcontractor.

**Parameters:** 
- @param {any} value: The value of the field/container driving the event.

**Returns:**
- @returns {void} This function does not return any value.

## rmsaRefNum()

**Description:** Should be called upon whenever the datatable `dt.RMSA.refs` (That is, form RMSA, Question 11 on the form) is changed. Will autopopulate the first row with its respective index.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## disableFields()

**Description:**  This function, disableFields(), is designed to disable specific fields in the OCIP B section, which are automatically calculated and should not be editable by users. It affects the "dt.OCIP.FB.S2.insurancePremium" data table and disables the "colnumOCIPFB2insurancePremiumPremium" column, as well as three fields below the data table:
- `num.OCIP.FB.S2.workHoursTotal`
- `num.OCIP.FB.S2.limitedPayrollTotal`
- `num.OCIP.FB.S2.premiumTotal`
By setting these fields to read-only (disabled), users won't be able to modify their values directly through the form UI, ensuring that the calculations are protected and remain accurate.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## setNamesOfDT()

**Description:** This function will set the attribute namesOfDataTables with an array containing all the names of the data tables in the form.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## addValidators()

**Description:** This function adds calls upong [rowValidators]{#rowValidators} and [validateFormattingDT]{#validateFormattingDT} to add their respective validators to the form.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## initialize()

**Description:** Call upon this to initialize all the functions of this class.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

# attachmentFunctions

## findFields()

**Description:** Searches the internal name for all fields that begin with an `a.`, our internal name signifier for an attachment

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## validator()

**Description:** Adds the "Only one" attachment validator to all the attachments in "attachmentFields"

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.

## initialize()

**Description:** Initializes all the attachments to only have one attachment. To be called from the outside world.

**Parameters:** null

**Returns:**
- @returns {void} This function does not return any value.