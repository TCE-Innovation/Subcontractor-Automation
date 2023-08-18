---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Home
nav_order: 1
permalink: /
---


# Table of Contents 
{: .no_toc}

1. TOC
{:toc}

# Quick Links

[Subcontractor Initialization Form](https://tce-innovation.github.io/Subcontractor-Automation/forms/initialization.html){: .btn .btn-blue }
[Correction Form](https://tce-innovation.github.io/Subcontractor-Automation/forms/correction.html){: .btn .btn-blue }
[Subcontractor Form](https://tce-innovation.github.io/Subcontractor-Automation/forms/subcontractor.html){: .btn .red-300 }

{: .warning }
> You should never have to click the subcontractor forms. An automatic email is generated upon initialization using the following format, replacing ```ContractNum``` and ```SubcontractorName``` with their respective information:
> ```
> https://tce-innovation.github.io/Subcontractor-Automation/forms/subcontractor.html?contract=[ContractNum]&subName=[SubcontractorName]&primeContact=[emailHere]
> ```
> Entering this page without the data will cause the form to improperly display.


# What is this process?

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

# Standard Operating Procedure

## Step 1: Initialization

Click [Subcontractor Initialization Form]. Fill out the requested information. The table at the very bottom will indicate the recipients of the subcontractor forms: these are the subcontractors who need to fill out these forms.

![](assets/images/initForm.png)
*In this image, we will send an email to Matthew, Rory, Chris, Rachel and Kyle, all the representatives of subcontractors being used by Stop Bug Incorporated under contract R-33333.*

## Step 2: Receipt

Subcontractors will recieve an email, with the subject line "[Prime Contractor] requests you fill out the following form" from the email <u>TCIG@tcelect.net</u>. This is the Innovation Group's email. The email will contain a link. Either click the link or copy paste into the browser, but the link **must** be copied in full. Not copying completely/following the link directly will result in a failed autofill, as this information is embedded in the URL.

## Step 3: Completion

When subcontractors click the link recieved, the following page will open up. It will autofill all the information that was initialized, and disable them. They are disabled so that the subcontractor cannot mess up known good information.

This form utilizes a wizard to error-check and validate the inputted information. Each step in the wizard represents a new form to be filled out. Extremely long forms, such as Schedule B, OCIP A, and OCIP B were broken down into parts, which each of those parts getting its own wizard. This ensure the subcontractor fills out all the required items.

For problems with formatting, see [Accepted Formatting](https://tce-innovation.github.io/Subcontractor-Automation/docs/formatting/)

![](assets/images/subcontractorForm.png)

*Here, we see the wizard guiding the subcontractor through the 12 steps necessary to complete their SQS/OCIP forms. Grayed out information, as shown, is known good information, provided to us by the initialization form. Thus, the user will not be able to edit it.*

## Step 4: Submission

The summary screen is the last screen the subcontractor will fill out. Here, they will fill out a table, indicating where who should recieve a copy of the completed documents. This is for subcontractor documentation.

Upon submission, subcontractor will be redirected to the following [thank you page.]({{base.url}}/forms/thankyou.html)

## Step 5: Summary

### Subcontractors
Subcontractors will then recieve an email, with the completed PDF forms they have submitted: one SQS form and one OCIP form. The order by which they are organized is shown in the table above.

### General Contractor

General Contractors will recieve an email once the subcontractor has filled out the form.
This email will contain the completed PDFs that the subcontractor has filled out. Addionally, the email will indicate the engineer to navigate to the submissions folder, where they can download the latest version of the subcontractor's filled out forms.

## Step 6: Correction

We have tried our best to implement as many error checking features as possible. However, we cannot check for content. Imagine if someone mispells their president's name "Jennifer" as "jenifer". Small change, but not something that we can catch, since there may be someone named "Jenifer".

In this case, we would utilize the [Correction Form]. Open the completed PDF and the correction form side by side. 

If everything on the forms appear correct, simply jump to [Step 7](#step-7-finish)

### Step 6a: Contract Number and Subcontractor Name

Click the dropdown menu for ```Contract Number``` and select the corresponding contract number. Then, do the same with ```subcontractor name```.

### Step 6b: Editable Items

Then, click ```Add New Record``` in the table. Two more dropdowns should appear, under ```Form Name``` and ```Items that Require Change```. 

As you navigate the form and find an error, you will be able to find the corresponding field in the correction form. 

### Step 6c: Add Emails

In the second table, add the emails of the representative that needs to correct their form. They will recieve an email indicating the items they need to correct, and which form to find it on.

![](assets/images/correctionFormsProcess.png)
*In this case, I am instructing Rory O'Neill to correct questions 10 and 11 on the SQS form. *

The subcontractor will get another email indicating to correct their mistakes. Jump back to [Step 3](#step-3-completion)

## Step 7: Finish!

You are all done! Both the subcontractor and the general contractor (That's you!) have recieved copies of the submission.



----

[Subcontractor Initialization Form]: forms/initialization.html

[Subcontractor Form]: forms/subcontractorForm.html

[Correction Form]: forms/correction.html
