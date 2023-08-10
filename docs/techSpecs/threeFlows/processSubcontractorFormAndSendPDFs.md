---
title: Process Subcontractor Form and Send PDFs
layout: page
nav_order: 1
parent: The Three Flows
grand_parent: Technical Specifications
---

#Process Subcontractor Form and Send PDFs

<h2>Table of Contents</h2>
{:toc}

<h2>Quick Links</h2>
[Purpose]
[Overview]
[How to Edit]

<h2>Purpose</h2>

This flow is an automated process that runs after a submission to the Subcontractor Form is received. It processes the data provided in the submission, generates individual Word Documents and PDFs, creates PDF packets, and sends the packets in individual emails to the subcontractor and TCE representative as indicated in the Initialization Form and Subcontractor Form.

[Back to top](#top)

<h2>Overview</h2>

The image below shows a high-level overview of the flow.
![](/doc/assets/images/processSubcontractorFormAndSendPDFs/annotatedWorkflow.png)

The Process Subcontractor Form and Send PDFs Power Automate flow is automatically triggered to run when the Subcontractor Form is submitted. After being triggered, it does the following:
1. Read data from the submitted Subcontractor Form
2. Process and format the data from the submission for population of Word Templates for each required form
3. Create Word Documents for each required form and convert them to PDFs
4. Download any attachments as PDFs.
5. Merge PDFs into packets.
6. Send confirmation email to subcontractor and TCE recipients as specified in the Initialization and Subcontractor Form.

All files are stored in a SharePoint folder organized by contract number, then subcontractor name, then the time that the form was submitted. The individual files for each MTA-required subcontractor form are named by the order in which they appear in their respective packet, the name of the form, the contract number, subcontractor name, and finally the file extension all separated by a period.

Path format: `.../<contractNumber>/<subcontractorName>/<timestamp>/`
File name format: `<orderInPacket>.<formName>.[<section1>.<section2>.<section3>...].<contractNumber>.<subcontractorName>.<fileExtension>`

Example path: `T-00001/Case2SQS/2023_08_09_10_51_25/`
Example file name: `1.0.OCIP.FAFB.T-00001.Case2SQS.pdf`

[Back to top](#top)

<h2>Connections, Triggers, and Actions Used</h2>

Only one trigger is used: Plumsail Forms - Form is submitted

Several connectors and actions are used in the creation of this flow:
* Plumsail Forms
    * Form is submitted
    * Download attachment
* Variable
    * Append to array variable
    * Initialize variable
    * Set variable
* Control
    * Apply to each 
    * Condition
    * Do until
    * Scope
* Data Operation
    * Compose
    * Parse JSON
    * Select
* Word Online (Business)* 
    * Convert Word Document to PDF
    * Populate a Microsoft Word template
* SharePoint
    * Create file
    * Get file content by path
* Adobe PDF Services*
    * Merge PDFs**
* Office 365 Outlook
    * Send an email (V2)

*Premium connectors require a Premium Power Automate license which costs $15/user/month as of Aug. 2023
**Every occurrence of Merge PDFs counts as one Document Transaction. There are two Document Transactions occur each time this flow is run - once for each packet that gets merged since the Merge PDFs action is used. See [Pricing and Limitation Considerations](/doc/pricingAndLimitationConsiderations.md) for more information.

<h2>How to Edit</h2>

See the Edit Power Automate Flow link for information on how to edit the flow itself and Edit Word Template for information on how to edit a word template to be used in the flow.

[Back to top](#top)