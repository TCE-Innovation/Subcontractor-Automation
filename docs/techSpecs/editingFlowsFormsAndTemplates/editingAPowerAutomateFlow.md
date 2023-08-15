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

#### `coalesce`
{: .no_toc}
Takes as many arguments as you provide it and returns the first non-null value. This is useful for defaulting values if a null value is provided.
Example: `coalesce(triggerBody()?['n.SB.P1.D.changedAddress'], 'N/A')`

#### `contains`
{: .no_toc}
Returns whether a string contains another string.
Example: `contains(item()['colddmcSBP5MemployedBy'], 'MTAC&D'`

### `equals`
{: .no_toc}
Takes two arguments and returns whether they are equal
Example: `equals(triggerBody()?['sc.SB.P3.H.compensationRating'], 'Yes')`

### `if`
{: .no_toc}
Takes three arguments:
1. Condition that returns a boolean value
2. Value to return if condition is true
3. Value to return if condition is false
Example: `if(equals(triggerBody()?['sc.SB.P5.L.none'], 'None'), 'None', '')`

#### `or`
{: .no_toc}
Takes two arguments and returns true if either argument is true.
Example: `or(equals(triggerBody()?['sc.SB.P3.G.safety'], 'Yes'),  
equals(triggerBody()?['sc.SB.P3.H.compensationRating'], 'Yes'))`

[Back to Top](#top)

### Arithmetic 

#### `add`
{: .no_toc}
Add numbers and returns the sum.
Example: `add(2, 4.9)`

#### `div`
{: .no_toc}
Takes two arguments and divides the first argument by the second.

#### `sub`
{: .no_toc}
Subtracts the second number from the first number.
Example: `sub(10, 3.1)`

[Back to Top](#top)

### String Formatting

#### `concat`
{: .no_toc}
Concatenate arguments into one string.
Example: `concat('Happy ', 'birthday ', '2 ', 'u!')`

#### `float`
{: .no_toc}
Takes a number argument and convers it to a float.

#### `formatDateTime`
{: .no_toc}
Format dates and times using macros. See the below links for more information:
* [https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/how-to-customize-or-format-date-and-time-values-in-flow](https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/how-to-customize-or-format-date-and-time-values-in-flow)
* [https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-dates-by-examples](https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-dates-by-examples)

Example: `formatDateTime(triggerBody()?['d.GI.dateSigned'], 'MM/dd/yyyy')`

#### `formatNumber`
{: .no_toc}
Used mostly to format currencies and percentages. See these links for more information: 
* [https://tomriha.com/how-to-format-numbers-currency-percentage-in-power-automate/#:~:text=How%20to%20format%20numbers%20%28currency%2C%20percentage%2C%E2%80%A6%29%20in%20Power,format%20them%20within%20the%20Power%20Automate%20flow.%20](https://tomriha.com/how-to-format-numbers-currency-percentage-in-power-automate/#:~:text=How%20to%20format%20numbers%20%28currency%2C%20percentage%2C%E2%80%A6%29%20in%20Power,format%20them%20within%20the%20Power%20Automate%20flow.%20)
* [https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-numbers-by-examples](https://learn.microsoft.com/en-us/power-automate/format-data-by-examples#format-numbers-by-examples)

Currency example: `formatNumber(item()['colnumOCIPFB2insurancePremiumPayroll'], 'C', 'en-US')`
Percentage example: `formatNumber(div(float(item()['colnumSF1Q6activeContractsPercentCompleted']), 100), 'P')`

#### `replace`
{: .no_toc}
Takes three arguments and replaces specific characters from a source string with specified characters.
1. Source string to replace characters in
2. String to replace
3. String to replace with
Example: `replace(variables('Sanitized sub name'), item(), '')`

#### `split`
{: .no_toc}
Takes a string to split into an array based on a character or sequence of characters. See these links for more information: 
* [https://zeitgeistcode.com/power-automate-split-function/](https://zeitgeistcode.com/power-automate-split-function/)
* [https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-split](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-split)
Example: `split( "Apples, Oranges, Bananas", "," )`

[Back to Top](#top)

### Array and JSON Object Operations

#### `addProperty`
{: .no_toc}
Add a property to a JSON object given object to add to, the name of the property, and the value of the property.
Example: `addProperty(items('Add_checkbox_fields_to_each_object_in_SB_P5_M1_Data_Table_Array'), items('Iterate_through_the_list_of_checkbox_fields_SB_P5_M1_Data_Table_Array'), '')`

#### `createArray`
{: .no_toc}
Creates an array containing the elements specified in the arguments.
Example: `createArray('.','@','ß','²','³','µ','´','°','^','=','(',')','&','$','§', '~','#','%','*',':','<','>','?','/','|',' ', ',')`

[Back to Top](#top)

## Common or More Complex Sequences of Actions

For help on specific Power Automate Actions, see [Additional Notes on Actions](#additional-notes-on-actions). For help on specific Power Automate Functions, see [Functions](#functions).

[Back to Top](#top)

### Populating a Word Template and Generating a PDF

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
