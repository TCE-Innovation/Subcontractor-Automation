---
title: Home
layout: home
nav_order: 1
---

1. TOC
{:toc}

# Quick Links

The following should be linked to regular HTML files in the doc folder
[TESTLINKHERE]

[Subcontractor Initialization Forms]

[Correction Forms]

[Subcontractor Forms]
Note: You should never have to click the subcontractor forms. An automatic email is generated upon initialization using the following format, replacing [ContractNum] and [SubcontractorName] with their respective information:
```
https://tce-innovation.github.io/Subcontractor-Automation/?contract=[ContractNum]&subName=[SubcontractorName]
```
Entering this page without the data will cause the form to improperly display.


# What is this form?

The MTA requires all subcontractors to fill out some permutation of the following forms, to be formatted as two packets: Statement of Qualification of Subcontractor (SQS) and Owner Controlled Insurance Program (OCIP). These two packets are to be submitted on different occasions. For simplicitys sake, TCE will ask subcontractors to complete the forms all at once.

|SQS|OCIP|
|:-:|:-:|
|SQS Form: Statement of Qualification of Subcontractor/RMSA: Request for Material Supplier Approval|OCIP Form A: Enrollment Form|
|Schedule F (Containing F1, F2, and F3)|OCIP Form B: Insurance Cost Worksheet|
|Schedule F1: Contract-Specific Subcontractor Questionaire| Certificate of Insurance (COI)|
|Schedule A: Federal Certification of Restrictions on Lobbying|
|Schedule B: Contractor Responsibility Form|
|Schedule B1: Contract Specific Responsibility Form|
|Form B - Intent to Perform|

TCE has had problems with these forms in the past - mainly subcontractors leaving required items uncompleted or misspelling information unknown to them, such as General Contractor information. The goal of this project is to minimize these mistakes as much as possible. This project will guide subcontractors through completing these forms, checking for correct formatting and mandating sections be filled where required. 

# Initializaing a new Contract

To start a new form, click [Subcontractor Initialization Forms], and enter in your information. This form will ask for several pieces of information, including
- General Contractor Name
- Telephone number of General Contractor
- Address of General Contractor
- MTA Contract Number
- General Contractor EIN
- Total Contract Value
- Name, email, and company name of the representatives who will fill out this form.

Upon submitting, an email will be generated and sent to the subcontractors listed. 
![](/assets/images/initForm.png)
*In this image, we will send an email to Matthew, Rory, Chris, Rachel and Kyle, all the representatives of subcontractors being used by Stop Bug Incorporated.*

# The Subcontractor Form


# Standard Operating Proce

## Step 1: Receipt

Subcontractors will recieve an email, with the subject line ________ from the email TCIG@tcelect.net. This is the Innovation Group's email. The email will contain a link. Either click the link or copy paste into the browser, but the link **must** be copied in full. Not copying completely/following the link directly will result in a failed autofill, as this information is contained in the URL.

## Step 2: Completion

When subcontractors click the link recieved, the following page will open up. It will autofill all the information that was initialized, and disable them. They are disabled so that the subcontractor cannot mess up known good information.

This form utilizes a wizard to error-check and validate the inputted information. Each step in the wizard represents a new form to be filled out. Extremely long forms, such as Schedule B, OCIP A, and OCIP B were broken down into parts, which each of those parts getting its own wizard. This ensure the subcontractor fills out all the required items.

For problems with formatting, see ___________

![](/assets/images/subForm.png)
*Here, we see the wizard guiding the subcontractor through the 12 steps necessary to complete their SQS/OCIP forms. Grayed out information, as shown, is known good information, provided to us by the initialization form.*

## Step 3: Submission

The summary screen is the last screen the subcontractor will fill out. Here, they will fill out a table, indicating where who should recieve a copy of the completed documents. This is for subcontractor documentation.

Upon submission, subcontractor will recieve an indication on the top of the page indicating "Your form has been submitted".

IMAGE HERE

## Step 4: Summary

### Subcontractors
Subcontractors will then recieve an email, with the completed PDF forms they have submitted: one SQS form and one OCIP form. The order by which they are organized is shown in the table above.

### General Contractor

**General Contractors will recieve an email once the subcontractor has filled out the form. THIS HAS NOT BEEN IMPLEMENTED YET** This email will indicate the engineer to navigate to the submissions folder, where they can download the latest version of the subcontractor's filled out forms.

## Formatting

### Phone Numbers and Fax Numbers

The following formats are accepted:
- 1234567890
- 123 456 7890
- 123-456-7890
- (123) 456 7890

To add an extension, type 'x' after the 10th digit and type the extension right after:
- 1234567890x1234
- 123 456 7890x1234
- 123-456-7890x1234
- (123) 456 7890x1234

### Contract Numbers

A letter followed by a dash and 5 numbers:
- A-12345
- B-09876
- C-00000

### Zip Codes

5 digit and 9 digit zip codes are accepted
- 10007
- 10007-1611
### Date
Dates are formatted in MM/DD/YYYY format.

## Error Checking

The forms employ format checking for the following items:
- Contract Numbers
- Phone Numbers
- Email Addresses
- EIN/SSN/TIN
- Date Formatting
- Date expiration vs date start

Additionally, the forms will force subcontractors to fill out mandatory items in full, if necessary. Take for example, Schedule B: Contractor Responsibility form. It is an optional form, albeit a very complex form. Thus, the item is only mandatory when the subcontractor indicates that they need to fill it out.




# The Correction Form

The correction form is for TCE internal use only. It is shown below: 
![](/assets/images/correctionForms.png)

Subcontractor name and contract number are drop downs to indicate which submission needs to be corrected. Populate this with the information of your choosing. 

Editable items contains two dropdowns: The Form name and the Item that Requires Change. These two items are based on the online form that exists, not the PDF forms. Thus, just like the online Subcontractor forms, some repetitive items may be missing here. 

    The dropdowns may also include items that don't exist in the form, such as "Hide PDF". These can be safely ignored.



----

[TESTLINKHERE]: https://tce-innovation.github.io/doc/subForm.html

[Subcontractor Initialization Forms]: https://tce-innovation.github.io/Subcontractor-Automation/initialization.html

[Subcontractor Forms]: https://tce-innovation.github.io/Subcontractor-Automation/

[Correction Forms]: https://tce-innovation.github.io/Subcontractor-Automation/correction.html
