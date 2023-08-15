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
## Additional Notes on Actions

### Plumsail Forms - Download Attachment

This action takes one argument - a `url` from the Plumsail Form for the corresponding Plumsail attachment field. Unfortunately, when you have multiple attachment fields, there is no obvious way to tell which `url` corresponds to which attachment field. 

![Attachment URLs]({{ site.baseurl }}/assets/images/powerAutomate/attachmentURLs.png)

Presumably, the `url`s are displayed in the order that they appear in the Plumsail Form. When you add `url`, it will automatically be nested in an "Apply to each" action because the dynamic value of `url` is an array of attachments and they are to be saved one at a time. The only way to check that you have the correct `url` is to check what dynamic value populated automatically as the argument in the "Apply to each" action. 

![Attachment Apply to Each]({{ site.baseurl }}/assets/images/powerAutomate/applyToEachAttachment.png)

We can see from the name that this `url` actually corresponds to Schedule B Part 4, not RMSA. If we have not already downloaded this attachment in the branch for Schedule B, we can click and drag this "Apply to each" action to the Schedule B branch and try again for the right attachment. If the dragging action does not work, you may have to save the flow and refresh the page first.

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
1. Source string to replace characters in
2. String to replace
3. String to replace with

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
    The file name prefix has already been defined in a variable called `Form Order and Filenames` - a JSON object which is parsed with a "Parse JSON" action called `Parse subcontractor form filenames JSON` in [Block 1](/docs/threeForms/subcontractorForm.md). Each property's key is the abbreviated version of the corresponding form and the value is the file name prefix. If you are adding a new form, you will need to add the file name prefix to `Form Order and Filenames` and update the schema in the `Parse subcontractor form filenames JSON` action. Then, in this field use the "Dynamic values" and find the appropriate output from the `Parse subcontractor form filenames JSON` action and append it with `docx`.
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

6. You're done! Below is an example 
![Complete Populate a Word Template and Create PDF Sequence]({{ site.baseurl }}/assets/images/powerAutomate/overviewOfPopulatingRMSAAndMakingPDF.png)

[Back to Top](#top)

### Handling Data Tables

TO DO 

[Back to Top](#top)

### Handling Ink Sketch Controls
The output of an Ink Sketch Control on Plumsail is a PNG. However, this must be formatted before it can be used to populate a Word Document. To properly format these controls for Word Template Population:

1. Create a "Compose" action or "Initialize variable" action and add the following expression: `replace(<inkSketchInternalName>, '"', '')`
2. Create another "Compose" action or an "Initialize variable" action immediately after the previous action and add the following expression: `dataUriToBinary(<outPutOfPreviousAction>)`
3. The output of step 2 can now be used for population of Picture Content Controls. Note that the dimensions are warped to fit the dimensions of the Word Template Picture Content Control and do not maintain the original image's dimensions. Thus you will have to manually adjust the dimensions within the Word Template itself and reupload if you need to edit it. 

![Format signature overview]({{ site.baseurl }}/assets/images/powerAutomate/formatSignatureOverview.png)

[Back to Top](#top)

### Getting Attachments from Plumsail

1. Create a "Download attachment" action from Plumsail. See the section on [Download attachment](#plumsail-forms---download-attachment) for additional assistance. 
2. Select the `url` from "Dynamic values" for the argument.
3. Open the "Apply to each" action that autogenerates and add a "Create file" action after the "Download attachment" action.
4. Add the appropriate parameters for the "Create file action".

TO DO: Add pictures

### Merging PDFs

TO DO

[Back to Top](#top)


### Emailing a Variable Number of Attachments from SharePoint

TO DO

[Back to Top](#top)
