---
title: Editing a Power Automate Flow
layout: default
parent: Editing Flows, Forms, and Templates
grand_parent: Technical Specifications
nav_order: 4
---

# Editing a Power Automate Flow
{: .no_toc }

## Table of Contents
{: .no_toc }

1. TOC
{:toc}

## Connectors, Actions, and Triggers Used

| Connector | Action/Trigger |
| ---       | --- |
| [Plumsail Forms](https://learn.microsoft.com/en-us/connectors/plumsailforms/) | Form is submitted (Trigger) <br> Download attachment |
| [Variable](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/variables) | Append to array variable <br> Initialize variable <br> Set variable |
| [Control](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference) | [Apply to each](https://learn.microsoft.com/en-us/power-automate/apply-to-each) <br> [Condition](https://learn.microsoft.com/en-us/power-automate/use-expressions-in-conditions) <br> [Do until](https://www.acuitytraining.co.uk/news-tips/power-automate-do-until/#:~:text=Do%20Until%20in%20Power%20Automate%20executes%20an%20action%20or%20series,time%20the%20loop%20is%20executed.) <br> [Scope](https://www.bloomsoftwareco.com/blog/keep-your-flows-organized-using-scopes-in-power-automate) |
| [Data Operation](https://learn.microsoft.com/en-us/power-automate/data-operations) | Compose <br> Parse JSON <br> Select |
| [Word Online (Business)](https://learn.microsoft.com/en-us/connectors/wordonlinebusiness/)* | Convert Word Document to PDF <br> Populate a Microsoft Word template |
| [SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/) | Create file <br> Get file content by path
| [Adobe PDF Services](https://learn.microsoft.com/en-us/connectors/adobepdftools/)* | Merge PDFs |
| [Office 365 Outlook](https://learn.microsoft.com/en-us/connectors/office365/) | Send an email (V2) |

{: .note}
> *Premium connectors

[Back to Top](#top)

## Additional Notes and Tips

### Alternative View on Power Automate

If you want a view for Power Automate that has more space to enter functions (helpful for populating fields) and a different interface for getting dynamic data from Plumsail Forms, click on the gear icon in the top right corner.

![Gear Button in Power Automate]({{ site.baseurl }}/assets/images/powerAutomate/alternateViewStep1.png)

Click on "View all Power Automate Settings."

![View all Power Automate Settings]({{ site.baseurl }}/assets/images/powerAutomate/alternateViewStep2.png)

Enable "Experimental Features." 

![Enable Experimental Features]({{ site.baseurl }}/assets/images/powerAutomate/alternateViewStep3.png)

Now you should have more space to write and view expressions and "Dynamic values" as opposed to the classic interface below:

![Old Power Automate View]({{ site.baseurl }}/assets/images/powerAutomate/oldView.png)

[Back to Top](#top)

### Plumsail Forms - Download Attachment

This action takes one argument - a `url` from the Plumsail Form for the corresponding Plumsail attachment field. Unfortunately, when you have multiple attachment fields, there is no obvious way to tell which `url` corresponds to which attachment field. 

![Attachment URLs]({{ site.baseurl }}/assets/images/powerAutomate/attachmentURLs.png)

Presumably, the `url`s are displayed in the order that they appear in the Plumsail Form. When you add a `url` in the argument, the "Download attachment" actionwill automatically be nested in an "Apply to each" action because the dynamic value of `url` is an array of attachments and they are to be saved one at a time. The only way to check that you have the correct `url` is to check what dynamic value populated automatically as the argument in the "Apply to each" action. 

![Attachment Apply to Each]({{ site.baseurl }}/assets/images/powerAutomate/applyToEachAttachment.png)

We can see from the name that this `url` actually corresponds to Schedule B Part 4, not RMSA. If we have not already downloaded this attachment in the branch for Schedule B, we can click and drag this "Apply to each" action to the Schedule B branch and try again for the right attachment. If the dragging action does not work, you may have to save the flow and refresh the page first.

[Back to Top](#top)

### Data Operation - Parse JSON

This action takes two arguments:
* Content: the data table as an array of JSON objects
* Schema: the JSON schema that outlines how the array is structured

Content can be matched directly with the data table from the Plumsail Forms trigger. 

Schema can be either typed or generated from a sample. Generating from a sample is easier if you already have a submission from which you can source an example of a filled out data table. To do so, you would have to click the "Generate from sample" button and paste in the JSON payload. 

![Generate from sample]({{ site.baseurl }}/assets/images/powerAutomate/generateJSONSchemaStep1.png)

![Paste JSON sample]({{ site.baseurl }}/assets/images/powerAutomate/generateJSONSchemaStep2.png)

To find the JSON, navigate to the Submissions --> Any Contract Number --> JSON and select any of the JSON files except for the contract number.

![JSON files folder]({{ site.baseurl }}/assets/images/powerAutomate/JSONfolder.png)

Inside, you can search for the data table using Ctrl + F. 

![Ctrl + F data table]({{ site.baseurl }}/assets/images/powerAutomate/findJSONObjectArray.png)

Below are some example JSON arrays and their corresponding schema:
Schema with a number - Schedule B Part 6 Data Table:
```
{
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "__id": {
                "type": "string"
            },
            "coltSBP6nameOfPartnerOwner": {
                "type": "string"
            },
            "colnumSBP6percentageOwned": {
                "type": "number"
            }
        },
        "required": [
            "__id",
            "coltSBP6nameOfPartnerOwner",
            "colnumSBP6percentageOwned"
        ]
    }
}
```

Example of a completed Schedule B Part 6 Data Table:

```
[
    {"__id":"e2c06c9d-4edb-4e68-b5dc-df66867e9b0a","coltSBP6nameOfPartnerOwner":"jfjlsf ","colnumSBP6percentageOwned":10.23},
    {"__id":"ca32ee82-82d6-4470-a4e4-239103ad8b34","coltSBP6nameOfPartnerOwner":"dwc","colnumSBP6percentageOwned":0.29},
    {"__id":"c9237750-94ec-413c-9b00-a23f0028e935","coltSBP6nameOfPartnerOwner":"DA","colnumSBP6percentageOwned":12},
    {"__id":"a6c1c491-2618-4f17-85ee-697c72db1265","coltSBP6nameOfPartnerOwner":"bleh","colnumSBP6percentageOwned":12.32}

]
```

Schema with a dropdown (multiple choice) - Schedule B P5 Data Table M:
```
{
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "__id": {
                "type": "string"
            },
            "coltSBP5MnameOfEmployee": {
                "type": "string"
            },
            "colddmcSBP5MemployedBy": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            }
        },
        "required": [
            "__id",
            "coltSBP5MnameOfEmployee",
            "colddmcSBP5MemployedBy"
        ]
    }
}
```

Sample completed Schedule B P5 Data Table M:
```
[
    {"__id":"e2193d4c-bb2a-4a13-85cb-f4df6174276e","coltSBP5MnameOfEmployee":"q1","colddmcSBP5MemployedBy":["MTA"]},{"__id":"ed176240-0759-441a-bfeb-acc3939795ab","coltSBP5MnameOfEmployee":"q2","colddmcSBP5MemployedBy":["NYCT"]},
    {"__id":"a4f1ae6a-d017-498b-9105-bcf141e78bae","coltSBP5MnameOfEmployee":"q3","colddmcSBP5MemployedBy":["MaBSTOA"]},{"__id":"e59487d2-a3bc-4256-81c8-70acf60018eb","coltSBP5MnameOfEmployee":"q4","colddmcSBP5MemployedBy":["SIRTOA"]},
    {"__id":"b9d77a11-85a6-46dc-a13b-95c5d033318c","coltSBP5MnameOfEmployee":"q5","colddmcSBP5MemployedBy":["MNR"]},{"__id":"c30863e4-4e91-4a85-8a01-4c7898885d2a","coltSBP5MnameOfEmployee":"q6","colddmcSBP5MemployedBy":["LIRR"]},
    {"__id":"c2a52608-a0cc-4c9c-a109-6b560ac6ba97","coltSBP5MnameOfEmployee":"q7","colddmcSBP5MemployedBy":["TBTA"]},{"__id":"e38029b6-c8e1-4296-8972-d7860ab7f8ec","coltSBP5MnameOfEmployee":"q8","colddmcSBP5MemployedBy":["MTAC&D"]},
    {"__id":"ada708e1-9e4d-432e-8c2a-9162525542ca","coltSBP5MnameOfEmployee":"q9","colddmcSBP5MemployedBy":["MTA BC"]},{"__id":"bd67cb81-3e2b-4efc-a78e-f6e65159b36b","coltSBP5MnameOfEmployee":"q10","colddmcSBP5MemployedBy":["NYCT","MaBSTOA","SIRTOA","LIRR","TBTA","MTAC&D","MTA BC","MTA","MNR"]}
]
```

If you want to type it out, use the examples above and the table below to infer.

| Type of Plumsail Field/Control            | JSON type         | 
| ---                                       | ---               |
| Text                                      | string            |
| Note                                      | string            |
| Number (no decimals)                      | integer           |
| Number (with at least 1 decimal place)    | number            | 
| Single Choice                             | string            | 
| Multiple Choice                           | array of string   |
| Date                                      | string            | 

[Back to Top](#top)

## Functions

Functions used in expressions in the Power Automate Flows of this project are listed below in alphabetical order:

### Logic and Compare

### `coalesce`
{: .no_toc }
Takes as many arguments as you provide it and returns the first non-null value. This is useful for defaulting values if a null value is provided.

Example: `coalesce(triggerBody()?['n.SB.P1.D.changedAddress'], 'N/A')`

### `contains`
{: .no_toc }
Returns whether a string contains another string.

Example: `contains(item()['colddmcSBP5MemployedBy'], 'MTAC&D'`

### `equals`
{: .no_toc }

Takes two arguments and returns whether they are equal.

Example: `equals(triggerBody()?['sc.SB.P3.H.compensationRating'], 'Yes')`

### `if`
{: .no_toc }

Takes three arguments:
1. Condition that returns a boolean value
2. Value to return if condition is true
3. Value to return if condition is false

Example: `if(equals(triggerBody()?['sc.SB.P5.L.none'], 'None'), 'None', '')`

### `or`
{: .no_toc }

Takes two arguments and returns true if either argument is true.
Example: `or(equals(triggerBody()?['sc.SB.P3.G.safety'], 'Yes'),  
equals(triggerBody()?['sc.SB.P3.H.compensationRating'], 'Yes'))`

[Back to Top](#top)

### Arithmetic 

### `add`
{: .no_toc }

Add numbers and returns the sum.

Example: `add(2, 4.9)`

### `div`
{: .no_toc }
Takes two arguments and divides the first argument by the second.

Example: `div(9, 3.0)`

### `sub`
{: .no_toc}
Subtracts the second number from the first number.

Example: `sub(10, 3.1)`

[Back to Top](#top)

### String Formatting

### `concat`
{: .no_toc }

Concatenate arguments into one string.

Example: `concat('Happy ', 'birthday ', '2 ', 'u!')`

### `float`
{: .no_toc }

Takes a number argument and convers it to a float.

Example: `float(8)`

### `formatDateTime`
{: .no_toc }

Format dates and times using macros. See the below links for more information:
* [https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/how-to-customize-or-format-date-and-time-values-in-flow](https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/how-to-customize-or-format-date-and-time-values-in-flow)
* [https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-dates-by-examples](https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-dates-by-examples)

Example: `formatDateTime(triggerBody()?['d.GI.dateSigned'], 'MM/dd/yyyy')`

### `formatNumber`
{: .no_toc }

Used mostly to format currencies and percentages. See these links for more information: 
* [https://tomriha.com/how-to-format-numbers-currency-percentage-in-power-automate/#:~:text=How%20to%20format%20numbers%20%28currency%2C%20percentage%2C%E2%80%A6%29%20in%20Power,format%20them%20within%20the%20Power%20Automate%20flow.%20](https://tomriha.com/how-to-format-numbers-currency-percentage-in-power-automate/#:~:text=How%20to%20format%20numbers%20%28currency%2C%20percentage%2C%E2%80%A6%29%20in%20Power,format%20them%20within%20the%20Power%20Automate%20flow.%20)
* [https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-numbers-by-examples](https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-numbers-by-examples)

Currency example: `formatNumber(item()['colnumOCIPFB2insurancePremiumPayroll'], 'C', 'en-US')`

Percentage example: `formatNumber(div(float(item()['colnumSF1Q6activeContractsPercentCompleted']), 100), 'P')`

### `replace`
{: .no_toc }

Takes three arguments and replaces specific characters from a source string with specified characters.
* Source string to replace characters in
* String to replace
* String to replace with

Example: `replace(variables('Sanitized sub name'), item(), '')`

### `split`
{: .no_toc }

Takes a string to split into an array based on a character or sequence of characters. See these links for more information: 
* [https://zeitgeistcode.com/power-automate-split-function/](https://zeitgeistcode.com/power-automate-split-function/)
* [https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-split](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-split)

Example: `split( "Apples, Oranges, Bananas", "," )`

[Back to Top](#top)

### Array and JSON Object Operations

### `addProperty`
{: .no_toc }
Add a property to a JSON object given object to add to, the name of the property, and the value of the property.

Example: `addProperty(items('Add_checkbox_fields_to_each_object_in_SB_P5_M1_Data_Table_Array'), items('Iterate_through_the_list_of_checkbox_fields_SB_P5_M1_Data_Table_Array'), '')`

### `createArray`
{: .no_toc }

Creates an array containing the elements specified in the arguments.

Example: `createArray('.','@','ß','²','³','µ','´','°','^','=','(',')','&','$','§', '~','#','%','*',':','<','>','?','/','|',' ', ',')`

[Back to Top](#top)

## Common or More Complex Sequences of Actions

For help on specific Power Automate Actions, see [Additional Notes on Actions](#additional-notes-on-actions). For help on specific Power Automate Functions, see [Functions](#functions).

[Back to Top](#top)

### Populating a Word Document and Generating a PDF

If you are creating a new form, create a parallel branch to the other branches that populate a Word Document from a template and generate a PDF. 

1. Add a "Populate a Word template" action.
    * Location: website where template file is located
    * Document Library: document library where template file is located
    * File: the relative path of the template. 
    {: .note}
    > It's recommended that you use the folder icon to navigate to the template yourself first, then cut the text from the box and re-paste it. This will ensure that you have the correct directory and avoid errors from Power Automate being unable to find the file if you update the template and reupload with the same name.

    * Fill in the fields as needed by formatting and matching the appropriate fields. 
    * Rename the action to be a descriptive and unique name.

    ![Populate a Word template]({{ site.baseurl }}/assets/images/powerAutomate/populateScheduleAWordTemplate.png)

2. Add a "Create file" action. This action will create the Word Document from the template filled with the data specified in Step 1 and place it in a SharePoint folder. 
    * Site Address: base URL to place the populated Word Document in.
    * Folder Path: the relative path of the Word Document to be created. Using the conventions, the folder path for an individual Word Document is:
    `.../<contractNumber>/<subcontractorName>/<timestamp>/Individual Word Documents`
    In the image, the above expression has already been formatted into a variable called `Word Docs File path` located in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md) which you can access through "Dynamic values"

    {: .note}
    > It's recommended that you use the folder icon to navigate to the template yourself first, then cut the text from the box and re-paste it. This will ensure that you have the correct base directory. 

    * File Name: the file name of the Word Document. 
    The file name prefix has already been defined in a variable called `Form Order and Filenames` - a JSON object which is parsed with a "Parse JSON" action called `Parse subcontractor form filenames JSON` in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md). Each property's key is the abbreviated version of the corresponding form and the value is the file name prefix. If you are adding a new form, you will need to add the file name prefix to `Form Order and Filenames` and update the schema in the `Parse subcontractor form filenames JSON` action. Then, in this field use the "Dynamic values" and find the appropriate output from the `Parse subcontractor form filenames JSON` action and append it with `docx`.
    * File Content: in "Dynamic values," select the Microsoft Word Document output from the "Populate a Word template" action from before.

    ![Create a Word Document]({{ site.baseurl }}/assets/images/powerAutomate/createScheduleAWordDocument.png)

3. Add a "Convert Word Document to PDF" action.

    * Location: website where the Word Document to convert is located
    * Document Library: document library where the Word Document to convert is located
    * File: the relative file path of the Word Document to convert

    {: .note}
    > It's recommended that you use the folder icon to navigate to the template yourself first, then cut the text from the box and re-paste it. This will ensure that you have the correct directory. There are also path properties from the "Create file" action that can be used here to access the file, but because at the time of writing this, we have not received a final official folder/directory to place these files and the path attained using the folder icon is different from using a similar method in the "Create file" action, we simply appended on the `Word Docs File path` variable and a `/` followed by the file name from the "Create file" action in "Dynamic values." In the future, this can be adjusted for easier maintenance.

    ![Convert Word Document to PDF]({{ site.baseurl }}/assets/images/powerAutomate/convertScheduleAWordToPDF.png)

4. Add another "Create file" action. This will create the PDF file that resulted from the conversion. The fields are filled out in a similar fashion to Step 2:
    * Site Address: same as Step 2
    * Folder Path: same as Step 2 except instead of `Individual Word Documents` it is `Individual PDF Documents`:
    `.../<contractNumber>/<subcontractorName>/<timestamp>/Individual PDF Documents`
    In the image, the above expression has already been formatted into a variable called `Individual PDFs File path` located in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md) which you can access through "Dynamic values"

    {: .note}
    > It's recommended that you use the folder icon to navigate to the template yourself first, then cut the text from the box and re-paste it. This will ensure that you have the correct base directory. 

    * File Name: the file name of the Word Document. Same as Step 2 but instead of appending with `docx`, you append with `pdf`.
    * File Content: in "Dynamic values," select the PDF Document output from the "Convert Word Document to PDF" action from before.

    ![Create PDF Document After Conversion]({{ site.baseurl }}/assets/images/powerAutomate/createScheduleAPDF.png)

5. If this form is not always required and the form needs to be merged into a packet, you will also have to add an "Append to array variable" action. It doesn't matter the order you put this action, as long as it is in the same branch. Right now, this action is above the "Populate a Word template" action. The arguments should be filled out such that the array to append to is the array of forms for the particular packet that the form belongs to and the value is the file name for the form from the `Parse subcontractor form filenames JSON` action. 

    ![Append RMSA to list of forms to merge]({{ site.baseurl }}/assets/images/powerAutomate/addRMSAToListOfFormsToMerge.png)

6. You're done! Below is an example of a completed "Populate a Word Template and Create PDF" sequence. 

    ![Complete Populate a Word Template and Create PDF Sequence]({{ site.baseurl }}/assets/images/powerAutomate/overviewOfPopulatingRMSAAndMakingPDF.png)

[Back to Top](#top)

### Handling Data Tables

Many forms have data tables in them, and depending on the contents, further processing may be needed. When populating Repeating Section Content Controls, there will be a corresponding Plumsail Data Table. Data tables are arrays of JSON objects and examples of schemas are provided. Passing an empty array to a Repeating Section Content Control when populating a Word Template will result in zero instances of that Repeating Section Content Control. Outlined below are some cases that occurred in the flows. Schedule B's branch has the most data tables and will be most helpful if you need  examples. 

* [Case 1: No Extra Formatting Needed](#case-1-no-extra-formatting-needed)
* [Case 2: Dates, Currencies, and/or Percentages](#case-2-dates-currencies-andor-percentages)
* [Case 3: Multiple Choice Drop Down](#case-3-multiple-choice-drop-down)
* [Case 4: Non-Required Data Tables](#case-4-non-required-data-tables)
* [Case 5: Default Values](#case-5-default-values)

#### Case 1: No Extra Formatting Needed
{: .no_toc}

Change the input of the data table field in Power Automate so that it takes an array by clicking the blue icon in the top-right corner. Then find the corresponding data table in "Dynamic values" and add that as the input. 

![Case 1: Simple matching]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesSimpleMatch.png)

[Back to Handling Data Table Cases](#handling-data-tables)
[Back to Top](#top)

#### Case 2: Dates, Currencies, and/or Percentages
{: .no_toc}

1. Initialize an array variable for your data table. Give the name of the action and the name of the variable descriptive names. 

    ![Initialize array variable for data table]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesInitializeArray.png)

2. Add a "Parse JSON" action and rename it to be descriptive. Provide the following arguments:
    * Content: the data table you need to parse
    * Schema: the JSON schema. This is how the JSON code that you are passing in is structured. The easiest way to add this is to use the "Generate from sample" button and pasting in an example JSON array from a prior form submission. You can also type it out yourself. See the section on [Data Operation - Parse JSON](#data-operation---parse-json) for more information.

    ![Parse JSON action]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesParseJSONExample.png)

3. Add a "Select" action. Provide the following arguments:
    * From: the body of the previous "Parse JSON" object
    * Map: the left column will be the key and the right column will be the value. Copy and paste in the names of all the columns that you want to include in your data table on the left (usually all of them except for `__id`). On the right, format the outputs from the "Parse JSON" action using `formatDateTime` and `formatNumber` if needed. Otherwise, you can simply map the corresponding output for text fields.

    ![Map Text, Dates, and Number Key Values]({{ site.baseurl }}/assets/images/powerAutomate/parseJSONMapDatesAndNumbers.png)

4. Set the data table variable equal to the output of the "Select" action.

    ![Set data table variable]({{ site.baseurl }}/assets/images/powerAutomate/setDataTableVarToSelectOutput.png)

5. Map the variable to the corresponding Content Control.

    ![Map data table variable to Content Control]({{ site.baseurl }}/assets/images/powerAutomate/mapDataTableVariableToContentControl.png)

6. [OPTIONAL] You can place your "Parse JSON," "Select," and "Set variable" actions in a "Scope" to organize them into one block. This can be helpful especially if you have many data tables to handle. You cannot place "Initialize variable" actions in a Scope however, as Power Automate requires this to be on the top-level and it cannot be nested in any action. When placing actions in a Scope, order is important as these actions depend on the one before. 

[Back to Handling Data Table Cases](#handling-data-tables)
[Back to top](#top)

#### Case 3: Multiple Choice Drop Down
{: .no_toc}

Data tables that have drop-downs with multiple choices or data that translates to multiple checkboxes or radio buttons on the template will require you to add new properties to the JSON objects in the JSON array. For example, Schedule B Part 5 M's data table asks the subcontractor to list all options that apply and has several checkboxes. 

![Schedule B P5 M Data Table]({{ site.baseurl }}/assets/images/microsoftWordTemplate/SBP5MDataTable.png)

To accomplish this follow the below steps:

1. Initialize an array of all of the checkbox/button internal names.

    ![Array of checkbox internal names]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesInitializeArrayMultipleChoices.png)

2. Follow steps 1-2 in [Case 2](#case-2-dates-currencies-andor-percentages).

3. Set the data table variable equal to the output of the "Parse JSON" action.

    ![Set data table variable equal to "Parse JSON" action]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesNestedMultipleChoiceStep3.png)

4. Create an "Apply to each" action and select the output of the "Parse JSON" action. Give this a descriptive name. 

5. Within the "Apply to each" action, add another "Apply to each" action and select the array of internal names you made in Step 1. 

6. Append each property to each JSON object within the data table array. Add a "Compose" action and in the "Inputs" field, add an expression with the function `addProperty`. Provide this the following arguments:
    1. The JSON object to add a property to - "Current item" from the outer "Apply to each" action in Step 4
    2. The key to add to the JSON object - "Current item" rom the inner "Apply to each" action in Step 5
    3. The value of the key to be added - an empty string `''`

    Example expression: `addProperty(items('Add_checkbox_fields_to_each_object_in_SB_P5_M1_Data_Table_Array'), items('Iterate_through_the_list_of_checkbox_fields_SB_P5_M1_Data_Table_Array'), '')`

    ![Nested checkbox steps 4-6]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesNestedMultipleChoiceSteps4-6.png)

7. Add a "Select" action. Provide the following arguments:
    * From: the array of JSON objects to select from
    * Map: the left column will be the key and the right column will be the value. Copy and paste in the names of all the columns that you want to include in your data table on the left (usually all of them except for `__id`). On the right, format the outputs from the "Parse JSON" action using `formatDateTime` and `formatNumber` if needed. Use the `if` function if you need to process the inputs further for specific outputs based on a condition. Otherwise, you can simply map the corresponding output for text fields.

    Example: `if(contains(item()['colddmcSBP5MemployedBy'], 'MTA'), '☑', '☐')`

    ![Select action nested checkbox]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesNestedMultipleChoiceStep7.png)

    ![Map Text, Dates, and Number Key Values]({{ site.baseurl }}/assets/images/powerAutomate/parseJSONMapDatesAndNumbers.png)

8. Set the data table variable equal to the output of the "Select" action.

9. Map the variable to the corresponding Content Control.

10. [OPTIONAL] You can place your "Parse JSON," "Select," "Apply to each," and "Set variable" actions in a "Scope" to organize them into one block. This can be helpful especially if you have many data tables to handle. You cannot place "Initialize variable" actions in a Scope however, as Power Automate requires this to be on the top-level and it cannot be nested in any action. When placing actions in a Scope, order is important as these actions depend on the one before. 

11. You're done! Below is an overview of what a completed sequence looks like. The initialization of arrays occurs above these actions and is not shown. 

    ![Overview of nested multiple choice]({{ site.baseurl }}/assets/images/powerAutomate/overviewOfNestedMultipleChoice.png)

[Back to Handling Data Table Cases](#handling-data-tables)
[Back to Top](#top)

#### Case 4: Non-Required Data Tables
{: .no_toc}

Add a "Condition" block to check whether the data table is applicable. Then nest the actual processing of the data table inside one of the blocks. 

![Scope example with non-required data tables]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesScopeExample.png)

![Conditional Data Tables]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesConditionalDataTables.png)

[Back to Handling Data Table Cases](#handling-data-tables)
[Back to Top](#top)

#### Case 5: Default Values
{: .no_toc}

Follow the steps in [Case 2](#case-2-dates-currencies-andor-percentages). After creating your data table array variable, selecting the properties, and setting the variable, create an "Append to array variable" action. Append to that data table array variable an object with the keys `"__id"` and all of the other keys with default values. 

![Append default values]({{ site.baseurl }}/assets/images/powerAutomate/handlingDataTablesAppendDefaultValues.png)

[Back to Handling Data Table Cases](#handling-data-tables)
[Back to Top](#top)

### Handling Ink Sketch Controls
The output of an Ink Sketch Control on Plumsail is a PNG. However, this must be formatted before it can be used to populate a Word Document. To properly format these controls for Word Template Population:

1. Create a "Compose" action or "Initialize variable" action and add the following expression: `replace(<inkSketchInternalName>, '"', '')`
2. Create another "Compose" action or an "Initialize variable" action immediately after the previous action and add the following expression: `dataUriToBinary(<outPutOfPreviousAction>)`
3. The output of step 2 can now be used for population of Picture Content Controls. Note that the dimensions are warped to fit the dimensions of the Word Template Picture Content Control and do not maintain the original image's dimensions. Thus you will have to manually adjust the dimensions within the Word Template itself and reupload if you need to edit it. 

    ![Format signature overview]({{ site.baseurl }}/assets/images/powerAutomate/formatSignatureOverview.png)

[Back to Top](#top)

### Download Attachments from Plumsail Forms

All attachments from Plumsail Forms are PDFs in this workflow. This is ensured by the JavaScript code prior to the submission of the Subcontractor Form.

1. Create a "Download attachment" action from Plumsail Forms. This should be in the same branch as the form the attachment belongs to. See the section on [Download attachment](#plumsail-forms---download-attachment) for additional information on this action. 

    ![Download attachment action]({{ site.baseurl }}/assets/images/powerAutomate/downloadAttachment.png)

2. Select the `url` from "Dynamic values" for the argument.

    ![Add url]({{ site.baseurl }}/assets/images/powerAutomate/attachmentURLs.png)

3. Open the "Apply to each" action that autogenerates and add a "Create file" action after the "Download attachment" action. If the autogenerated attachment field for the `url` that you selected does not match the branch you initially placed it in, you can drag it to the correct branch later or delete it. Either way, you will have to go back to Step 1 and repeat until you have found the correct `url`.

    ![Apply to each attachment]({{ site.baseurl }}/assets/images/powerAutomate/applyToEachAttachment.png)

4. Add the appropriate parameters for the "Create file action". Rename your actions to be more descriptive to the attachment that you are downloading. 
    * Site Address: base URL to place the attachment in.
    * Folder Path: the relative path of the attachment to be created. Using the conventions, the folder path for an individual Word Document is:
    `.../<contractNumber>/<subcontractorName>/<timestamp>/Individual PDF Documents`
    In the image, the above expression has already been formatted into a variable called `Individual PDFs File path` located in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md) which you can access through "Dynamic values"
    * File Name: the file name of the Word Document. 
    The file name prefix has already been defined in a variable called `Form Order and Filenames` - a JSON object which is parsed with a "Parse JSON" action called `Parse subcontractor form filenames JSON` in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md). Each property's key is the abbreviated version of the corresponding form and the value is the file name prefix. If you are adding a new form, you will need to add the file name prefix to `Form Order and Filenames` and update the schema in the `Parse subcontractor form filenames JSON` action. Then, in this field use the "Dynamic values" and find the appropriate output from the `Parse subcontractor form filenames JSON` action and append it with `pdf`.
    * File Content: in "Dynamic values," select the "Result file" output from the "Download attachment" action from before.
    
    ![Create Schedule B P4 Attachment]({{ site.baseurl }}/assets/images/powerAutomate/createSBP4Attachment.png)

5. If this form is not always required and the form needs to be merged into a packet, you will also have to add an "Append to array variable" action. It doesn't matter the order you put this action, as long as it is in the same branch. Right now, this action is above the "Populate a Word template" action. The arguments should be filled out such that the array to append to is the array of forms for the particular packet that the form belongs to and the value is the file name for the form from the `Parse subcontractor form filenames JSON` action. 

    ![Append Schedule B P4 Attachment to list of forms to merge]({{ site.baseurl }}/assets/images/powerAutomate/addSBP4AttachmentToListOfFormsToMerge.png)

6. You're done! Below is an example of a completed "Download attachments from Plumsail Forms" sequence. 

    ![Complete Schedule B P4 Download Attachment Sequence]({{ site.baseurl }}/assets/images/powerAutomate/overviewOfDownloadingSBP4Attachment.png)

[Back to Top](#top)

### Merging PDFs

1. Initialize an array variable using the "Initialize variable" action. This will store the file contents of the PDFs to be merged and will be appended with content. No initial value was provided so it starts as an empty array. Name the action and variable so that they are descriptive.

    ![Initialize array variable]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep1.png)

2. Add an "Apply to each" action. Iterate over the array of file name prefixes for files to be merged. In this example, that variable is `Subcontractor Files to Merge`. 

    ![Apply to each action]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep2.png)

3. Add a "Get file content using path" action. Rename the action to be specific and descriptive to ts purpose. Supply the following parameters:
    * Site Address: base URL to find the files to be merged
    * File Path: the relative path of the attachment to be created. Using the conventions, the folder path for an individual Word Document is:
    `.../<contractNumber>/<subcontractorName>/<timestamp>/Individual PDF Documents`
    In the image, the above expression has already been formatted into a variable called `Individual PDFs File path` located in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md) which you can access through "Dynamic values".  This should then also be appended with `/`, the "Current item" output from the "Apply to each action" that you created before which is the file name prefix, and finally `pdf`.

    ![Get file content using path]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep3.png)

4. Add an "Append to array variable" action after the "Get file contents using path" action. Append to the array variable created to hold the file contents the following value `trim(base64(body(<name of "Get file contents using path" action>)))` and replace `<name of "Get file contents using path" action>` with the appropriate value.

    ![Append subcontractor file contents to subcontractor files array]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep4.png)

5. [OPTIONAL] If you are sure that there will be at least 1 file to merge, you do not have to chack the length of the array and can skip to the next step. Otherwise, add a condition action and check if the length of the array is greater than 0.

    ![Check length of array with files to merge is greater than 0]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep5.png)

6. In the "If yes" box, add a "Merge PDFs" action from the Adobe PDF Services connector. Rename this action to be more descriptive. If a connection has not already been added, you will be prompted with the below image:

    ![Request to add Adobe PDF Services]({{ site.baseurl }}/assets/images/powerAutomate/requestToAddAdobePDFServicesConnection.png)

    You will have to go to the Adobe Website to create free credentials for the [Adobe PDF Services API here](https://developer.adobe.com/document-services/apis/pdf-services/). Follow the instructions on the website. After creating a connection, you can provide the corresponding values. Otherwise, you can also add a new connection by first saving your flow and then going Data --> Connections in the left menu. Click on "+ New Connection" and scroll down to find the Adobe PDF Services where it will ask you for the same parameters. 

    ![Add a new connection]({{ site.baseurl }}/assets/images/powerAutomate/addNewConnection.png)

    Once you add the connection, you will not have to repeat this for other instances of Adobe PDF Services actions. 

    Supply the following arguments to the "Merge PDFs" action:
    * Merged PDF File Name: provide a descriptive name for the PDF packet to be created after merging and append it with the contract number and subcontractor name. This is provided in a variable called `Filename contract no. and sub name` which can be accessed through "Dynamic values".
    * Files: change the type of input into an array instead of individual files and their names by clicking on the top right blue icon. Then add the array variable you initialized in Step 1.

    ![Change input type of Merge PDFs]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsChangeInputType.png)

    ![Merge PDFs action]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep6.png) 

7. Add a "Create file" action below the "Merge PDFs" action. Add the appropriate parameters for the "Create file action". 
    * Site Address: base URL to place the merged PDF packet in.
    * Folder Path: the relative path of the attachment to be created. The folder path for PDF packets is:
    `.../<contractNumber>/<subcontractorName>/<timestamp>`
    In the image, the above expression has already been formatted into a variable called `Merged PDF Packets File path` located in [Block 1]({{ site.baseurl }}/docs/threeForms/subcontractorForm.md) which you can access through "Dynamic values" and append to the rest of the path.

    {: .note}
    > To ensure that you have the correct path initially, use the blue folder icon in the corner to navigate to the base folder, then append the variable `Merged PDF Packets File path`. This path is also subject to change, and if it needs to be updated, update the variable in Block 1.

    * File Name: the file name of the Word Document. Select the `PDF File Name` output from the "Merge PDFs" action. 
    * File Content: The content of the merged PDF packet. Select the `PDF File Content` output from the "Merge PDFs" action. 
    
    ![Create Schedule B P4 Attachment]({{ site.baseurl }}/assets/images/powerAutomate/mergePDFsStep7.png)

8. You're done! Below is an example of a completed "Merge PDFs" sequence. 

    ![Complete merge subcontractor forms sequence]({{ site.baseurl }}/assets/images/powerAutomate/overviewOfMergingSubcontractorFormPDFs.png)

[Back to Top](#top)

### Emailing a Variable Number of Attachments from SharePoint to a Variable Number of Recipients

1. Initialize an array variable for the email attachments. 
If there are any attachments that will always be included in the email, you can provide them in the initial value. Each file to be attached is represented as a JSON object with the properties:
    * `"Name"`: the name of the attachment. If you have a previous "Merge PDFs" action, you can supply the "PDF File Name" output. You can also provide a different name if you'd like (see images below)
    * `"ContentBytes"`: the content of the attachment. If you have a previous "Merge PDFs" action, you can supply the "PDF File Content" output. 

    ![Initialize array variable for email attachments using outputs of Merge PDFs action]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep1.png)

    ![Initialize array variable for email attachments using outputs of Merge PDFs action alternate naming]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep1AlternateNaming.png)

2. For any attachments that are not always included in the email, add a "Condition" action to check when it should be included. Depending on your condition, you will then add a "Get file content using path" action in either the "If yes" or "If no" block.
Rename the action to be specific and descriptive to ts purpose. Supply the following parameters:
    * Site Address: base URL to find the files to be merged
    * File Path: the relative path of the attachment to be created. You can go into "Dynamic values" and find the corresponding "Create file" action with a "Path" output.

    ![Get file content using path]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep2.png)

3. Add an "Append to array variable" after the "Get file content using path" action. Append a JSON object with the following properties to the variable you created in Step 1:
    * "Name": "Name" from the "Get file content using path" action"
    * "ContentBytes": `body(<nameOfGetFileContentUsingPatchAction>)?[$content]`

    ![Append file contents to email attachments]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep3.png)

4. Initialize strings for email addresses that successfully were sent the emails and unsuccessfully were sent the emails. Provide no initial value. You can also initialize a string to format the time of the receipt. 

    ![Initialize strings for failed and successful receipts and time]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep4.png)

5. Create an "Apply to each" action. Rename it to be descriptive for its purpose. Iterate over the list of emails provided by the subcontractor to send receipts to. This will come from the Plumsail Forms and is called `dt.GI.receipts`.

    ![Apply to each email]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep5.png)

6. Within the "Apply to each" action, create a new "Send an email (V2)" action. Provide the following arguments:
* To: `coltGIreceiptsEmail` (the current item from the enclosing "Apply to each" action)
* Subject: subject of the email. You can add dynamic content here. 
* Body: body of the email. You can add dynamic content here. 
* From (Send as): [OPTIONAL] TCIG@tcelect.net
* CC: [OPTIONAL] any emails to be CC'd
* BCC: [OPTIONAL] any emails to be BCC'd
* Attachments: the array of attachments that you made earlier. You will have to click "Show advanced options" to see this field. Remember to change the input type so that you can attach an array instead of individual attachments and their names.
There are several other arguments as well that you can fill in as needed.

    ![Apply to each email]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep6.png)

7. Create two "Append to string variable" actions in parallel with each other. One will add the emails of successful receipts to the array of successful emails, and the other will add the emails of failed receipts to the array of failed receipts. Configure the run after for the "Append to string variable" action for failed receipts such that it will run after the "Send email (v2)' action has failed, is skipped, or has timed out.

    ![Config run after step 1]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep7ConfigRunAfter1.png)
    ![Config run after step 2]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep7ConfigRunAfter2.png)

    The value to be appended in both is: 
    `concat(items('Send_emails_with_attachment_to_every_recipient')?['coltGIreceiptsName'], ': ', items('Send_emails_with_attachment_to_every_recipient')?['coltGIreceiptsEmail'], '<br>')`

    ![Append to successful and failed emails strings]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep7.png)

8. Initialize an array of TCE-specified recipient emails. These emails will be sent a notification that the subcontractor has completed the forms and whether all emails were sent successfully. Also, append `t.GI.primeContractorRepresentativeEmail` from Plumsail Forms. 

    ![Create array of TCE recipients]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep8.png)

9. Create a "Condition" action to check whether the length of the string of failed emails is greater than 0. 

    ![Check if there were any failed receipts]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep9.png)

10. In the "If no" block, create an "Apply to Each" and iterate over TCE Recipient Emails array. Create a "Send email (v2)" action similar to before in step 6, except that this email is not to the subcontractor, but TCE and should be written that way. Within the email body, add the string of successful receipts using the variable created before. 

    ![Send confirmation emails to TCIG]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep10.png)

11. Copy the "Apply to each" action from the "If no" block into the "If yes" block by clicking on the three dots and selecting "Copy to my clipboard (Preview)".

    ![Copy confirmation email actions in Power Automate]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep11.png)

12. Add an action in the "If yes" block and go to the "Clipboard" tab to paste in the copied actions. Adjust the copied actions to reflect that in the "If yes" block, you will be sending an email notifying TCE that not all emails were successfully sent.

    !["If yes" block pasted and edited actions]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep12.png)

13. You're done! Below is an overview of what the complete sequence looks like:

    ![Overview of Emailing Variable Number of Attachments from SharePoint to a Variable Number of Recipients]({{ site.baseurl }}/assets/images/powerAutomate/emailingVariableNumberOfAttachmentsFromSharePointStep13.png)

[Back to Top](#top)
