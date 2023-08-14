---
title: Process Subcontractor Form and Send PDFs
layout: page
nav_order: 1
parent: The Three Flows
grand_parent: Technical Specifications
---

# Process Subcontractor Form and Send PDFs
{: .no_toc}

## Table of Contents

1. Table of Contents
{:toc}

## Purpose 

This flow is an automated process that runs after a submission to the Subcontractor Form is received. It processes the data provided in the submission, generates individual Word Documents and PDFs, creates PDF packets, and sends the packets in individual emails to the subcontractor and TCE representative as indicated in the Initialization Form and Subcontractor Form.

[Back to top](#top)

## Overview

The Process Subcontractor Form and Send PDFs Power Automate flow is automatically triggered to run when the Subcontractor Form is submitted. After being triggered, it does the following:
1. Read data from the submitted Subcontractor Form
2. Process and format the data from the submission for population of Word Templates for each required form
3. Create Word Documents for each required form and convert them to PDFs
4. Download any attachments as PDFs.
5. Merge PDFs into packets.
6. Send confirmation email to subcontractor and TCE recipients as specified in the Initialization and Subcontractor Form.

The above steps are described further in detail in their respective sections. 

The image below shows a high-level overview of the flow. 

![Annotated Power Automate Workflow]({{ site.baseurl }}/assets/images/powerAutomate/annotatedSubcontractorFlow.png)

[Back to top](#top)

## Connections, Triggers, and Actions Used 

Only one trigger is used: [Plumsail Forms](https://learn.microsoft.com/en-us/connectors/plumsailforms/) - Form is submitted

Several connectors and actions are used in the creation of this flow:
* [Plumsail Forms](https://learn.microsoft.com/en-us/connectors/plumsailforms/)
    * Form is submitted
    * Download attachment
* [Variable](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference/variables)
    * Append to array variable
    * Initialize variable
    * Set variable
* [Control](https://learn.microsoft.com/en-us/power-automate/desktop-flows/actions-reference)
    * [Apply to each](https://learn.microsoft.com/en-us/power-automate/apply-to-each) 
    * [Condition](https://learn.microsoft.com/en-us/power-automate/use-expressions-in-conditions)
    * [Do until](https://www.acuitytraining.co.uk/news-tips/power-automate-do-until/#:~:text=Do%20Until%20in%20Power%20Automate%20executes%20an%20action%20or%20series,time%20the%20loop%20is%20executed.)
    * [Scope](https://www.bloomsoftwareco.com/blog/keep-your-flows-organized-using-scopes-in-power-automate)
* [Data Operation](https://learn.microsoft.com/en-us/power-automate/data-operations)
    * Compose
    * Parse JSON
    * Select
* [Word Online (Business)](https://learn.microsoft.com/en-us/connectors/wordonlinebusiness/)* 
    * Convert Word Document to PDF
    * Populate a Microsoft Word template
* [SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/)
    * Create file
    * Get file content by path
* [Adobe PDF Services](https://learn.microsoft.com/en-us/connectors/adobepdftools/)*
    * Merge PDFs**
* [Office 365 Outlook](https://learn.microsoft.com/en-us/connectors/office365/)
    * Send an email (V2)

>*Premium connectors require a Premium Power Automate license which costs $15/user/month as of Aug. 2023
>**Every occurrence of Merge PDFs counts as one Document Transaction. There are two Document Transactions occur each time this flow is run - once for each packet that gets merged since the Merge PDFs action is used. See [Pricing and Limitation Considerations](/doc/pricingAndLimitationConsiderations.md) for more information.

[Back to Top](#top)

## How to Edit

> This section describes the structure specific to the subcontractor flow in greater detail to inform the maintainer how approach making changes. If you need help with how to actually edit a template, see Edit Word Template. If you need help with editing actions and Power Automate Workflows in general, see Edit Power Automate Flow. 

The flow is organized roughly into the four sections seen in the [Overview](#Overview) section.

### Block 1: Collect Responses and Initialize File Variables 
* Collect responses from Plumsail Forms through the "Form is submitted" trigger
* Initialize and format variables for dates, times, Ink Sketch controls (signatures), file paths, file names, and merge order

![Block 1: Collect Responses and Initialize File Variables]({{ site.baseurl }}/assets/images/powerAutomate/block1.png)

The actions here for the most part are self-explanatory if you have prior experience with Power Automate. Important outputs from this block include:

* A 1x1 filler image in case a Picture Content Control needs to be populated but no corresponding image is provided.
* Signature 
* Formatted date and time of submission receival
* Subcontractor name with illegal characters removed
* Relative file paths endings for individual Word Documents, individual PDFs, and merged PDF packets
* An object containing file names for each template
* Array of names of the SQS forms to merge
* Array of names of the OCIP forms to merge

All files are stored in a SharePoint folder organized by contract number, then subcontractor name, then the time that the form was submitted. The individual files for each MTA-required subcontractor form are named by the order in which they appear in their respective packet, the name of the form, the contract number, subcontractor name, and finally the file extension all separated by a period.

Path format: `.../<contractNumber>/<subcontractorName>/<timestamp>/`
File name format: `<orderInPacket>.<formName>.[<section1>.<section2>.<section3>...].<contractNumber>.<subcontractorName>.<fileExtension>`

Example path: `T-00001/Case2SQS/2023_08_09_10_51_25/`
Example file name: `1.0.OCIP.FAFB.T-00001.Case2SQS.pdf`

[Back to Top](#top)

### Block 2: Populate Word Documents, Convert to PDFs, and Get PDF Attachments

* Populate new Word Documents from Word Templates 
* Convert populated Word Documents into PDFs
* Download any PDF attachments
* Save individual Word Documents and PDFs into the correct SharePoint folder

![Block 2: Populate Word Documents, Convert to PDFs, and Get PDF Attachments]({{ site.baseurl }}/assets/images/powerAutomate/block2.png)

Each parallel branch represents one form. Form documents are generated using the "Populate Word template," "Create file," and "Convert Word Document to PDF" actions in that order, and so every branch will at the least contain these three actions. 

Some forms are not always required:
* Schedule B
* Schedule B1
* Schedule G

Some forms also include conditional attachments which will be generated as separate PDFs from the actual form:
* SQS
* Schedule B
* Schedule B1
* Schedule F1 
* OCIP Form B

Several conditionals are used to account for these cases. See Edit a Power Automate Flow for information on how to make changes to the flow. 

[Back to Top](#top)

### Block 3: Merge PDF Packets
* Get PDF file contents for the SQS Packet and merge them
* Get PDF file contents for the OCIP Packet and merge them

![Block 3: Merge PDF Packets]({{ site.baseurl }}/assets/images/powerAutomate/block3.png)

This is where the arrays for SQS and OCIP forms are used to only get the forms needed to be merged. The "Get file content using file path" action is used with those arrays to get the file content and merge using Adobe PDF Services's "Merge PDF" action. See Edit a Power Automate Flow for information on how to format arguments for merging.

[Back to Top](#top)

### Block 4: Email Receipts to Subcontractor and TCE Representatives
* Receipt emails with PDF packet attachments are sent to email addresses specified by the subcontractor in the Subcontractor Form
* Email with PDF packet attachments is sent to the specified TCE representative as specified on the Initialization Form 
* Email confirming whether emails were able to be sent to all of the email addresses specified by the subcontrator in the Subcontractor Form is sent to TCIG

Emails are sent individually to each specified recipient. Receipt emails contain 2-3 attachments depending on whether Schedule G was applicable and should or should not be attached. The subcontractor is required to add at least one email address to send the email with attachments to. There will also be one representative from TCE whose email was specified in the Initialization form to be notified when the subcontractor submitted a form. If for some reason an email is unable to be sent to one of the emails specified by the subcontractor, the TCE representative will be notified which emails failed to send and to whom. Otherwise, there will be a confirmation email saying that all emails were successful that lists all of the emails specified by the subcontractor. 

![Block 4: Email Receipts to Subcontractor and TCE Representatives]({{ site.baseurl }}/assets/images/powerAutomate/block4.png)

[Back to Top](#top)


----

