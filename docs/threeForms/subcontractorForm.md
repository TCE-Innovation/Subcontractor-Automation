---
title: Subcontractor Form
layout: home
nav_order: 2
parent: The Three Forms
---

# Subcontractor Form
{: .no_toc}

# Table of Contents 
{: .no_toc}

1. TOC
{:toc}

## Purpose 

The MTA Subcontractor Form is to be filled out by the subcontractors asked to complete the forms required by the MTA as of Aug. 2023. This collects the information needed to fill out the appropriate forms which will be used to trigger the "Process Subcontractor Form and Send PDFs" Power Automate Flow. 

[Back to top](#top)

## Overview 

Subcontractors will receive an invitation to fill out this form via email after the prime contractor (ex: TCE) completes the Initialization Form. Upon opening the form from the email, the subcontractor will be brought to the Subcontractor Form and be asked to complete the form. It will be partially  prepopulated data about known information such as the prime contractor name from the Initialization Form The subcontractor must complete each form in sequential order and fill in all of the required fields before being able to proceed to the next step. The form ensures that proper formatting and all required fields are complete before submission using JavaScript. Forms are organized using a wizard in which every step is one form. They are also ordered in the same order that they would be merged into their respective PDF packets. 

![Subcontractor Form Wizard]({{ site.baseurl }}/assets/images/subcontractorForm/wizard.png)

Submitting the form will trigger the [Process Subcontractor Form and Send PDFs Power Automate flow]({{ site.baseurl }}/docs/techSpecs/Power%20Automate%20Flows/processSubcontractorFormAndSendPDFs.md) that will generate the PDFs to be reviewed and submitted to the MTA.

[Back to top](#top)

## How to Edit 

Like the Initialization Form and Correction Form, the Subcontractor Form was created using Plumsail Forms and JavaScript. If you are from TCE and need to edit the form, please see the [Editing with Plumsail]({{ site.baseurl }}/docs/techSpecs/plumsail.md) and [Editing with JavaScript]({{ site.baseurl }}/docs/techSpecs/javascript.md) pages for information on how to edit forms with Plumsail and JavaScript.

[Back to top](#top)
