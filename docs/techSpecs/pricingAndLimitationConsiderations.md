---
title: Pricing and Limitation Considerations
layout: page
nav_order: 2
parent: Technical Specifications
---

#Pricing and Limitation Considerations

<h2>Table of Contents</h2>
{:toc}

<h2>Quick Links</h2>

[Overview]
[Power Automate]
[Plumsail Public Forms]
[Adobe PDF Services API]

<h2>Overview</h2>

A premium [Power Automate license](https://powerautomate.microsoft.com/en-us/pricing/) which costs $15/user/month is required for the Process Subcontractor Form and Send PDFs Power Automate flow. Currently, the free tiers of Plumsail Public Forms and Adobe PDF Services are being used. To maintain greater cost-effectiveness, it would be ideal to remain within the limitations of these free tiers.

<h2>Power Automate</h2>

As of Aug. 2023, a premium [Power Automate license](https://powerautomate.microsoft.com/en-us/pricing/) costs $15/user/month is required for the Process Subcontractor Form and Send PDFs Power Automate flow to use the Word Business (Online) and Adobe PDF Services API connectors. 

![](assets/images/powerAutomate/powerAutomatePricing.png)

Only one account with the Power Automate Premium is required. Currently, the TCIG@tcelect.net email has Power Automate Premium and is being used to maintain the Power Automate Flows used in this system.

Flows must be turned on to work, but they automatically turn off after 60 days of not being triggered. At the moment, we have not implemented a way to keep them on, but this website outlines the steps required to make a Power Automate flow to re-anable flows: https://sharepains.com/2020/12/02/re-enable-flows-power-automate/. For now, to turn on/off a flow manually:

1. Navigate to "My Flows" and click on the flow to turn on.

![](assets/images/powerAutomate/turnOnAFlowStep1.png)

2. Click the "Turn On/Off" Button.

![](assets/images/powerAutomate/turnOnAFlowStep2.png)

Alternatively, click the three dots from Step 1 and then the Turn On/Off button.

<h2>Plumsail Public Forms</h2>

As of Aug. 2023, Plumsail Public Forms offers [several tiers](https://plumsail.com/forms/store/public-forms/) to use its services as shown in the picture below:

![](assets/images/plumsail/plumsailFormsPricing.png)

The free tier allows 100 submissions/month and 100 Mb of file storage. The next tier is $12/month which allows for 1000 submissions/month and 1Gb of storage. Each submission takes up very little storage, so this will not be a worry, however the 100 submissions/month effectively limits this form to be used up to a maximum of 100 times per month to stay within the free tier. 

<h2>Adobe PDF Services API</h2>

As of Aug 2023, Adobe PDF Services API offers a [free tier](https://developer.adobe.com/document-services/pricing/main/) to use their Adobe PDF Services actions for 500 Document Transactions per month. The only other option is Enterprise Pricing, for which pricing details must be ascertained by contacting sales.

![](assets/images/adobeAcrobat/adobePDFServicesAPIPricing.png)

It is possible to check the current amount of Document Transactions used by logging to the account being used to access the Adobe PDF Services Connector and generating a report.

1. Login and navigate to the site: https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api

2. Click on the "Check usage" button in the top right.

![](assets/images/adobeAcrobat/checkUsageStep1.png)

3. Select the period and client ID to check usage for and click on the "Generate Report" button.

![](assets/images/adobeAcrobat/checkUsageStep2.png)

Staying on the free tier for Adobe PDF Services API requires that ths flow only be used up to a maximum of 250 times using one free connection. 