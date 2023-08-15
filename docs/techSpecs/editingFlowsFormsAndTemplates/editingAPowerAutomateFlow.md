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

## Functions

### `formatDateTime`
very useful function that you can use in expressions for formatting dates and times in a particular way using macros. See this link for help: [https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/how-to-customize-or-format-date-and-time-values-in-flow](https://learn.microsoft.com/en-us/troubleshoot/power-platform/power-automate/how-to-customize-or-format-date-and-time-values-in-flow)'

[Back to Top](#top)

## Handling Ink Sketch Controls
The output of an Ink Sketch Control on Plumsail is a PNG. However, this must be formatted before it can be used to populate a Word Document. To properly format these controls for Word Template Population:

1. Create a "Compose" action or "Initialize variable" action and add the following expression: `replace(<inkSketchInternalName>, '"', '')`
2. Create another "Compose" action or an "Initialize variable" action immediately after the previous action and add the following expression: `dataUriToBinary(<outPutOfPreviousAction>)`
3. The output of step 2 can now be used for population of Picture Content Controls. Note that the dimensions are warped to fit the dimensions of the Word Template Picture Content Control and do not maintain the original image's dimensions. Thus you will have to manually adjust the dimensions within the Word Template itself and reupload if you need to edit it. 

![Format signature overview]({{ site.baseurl }}/assets/images/powerAutomate/formatSignatureOverview.png)

[Back to Top](#top)

## Merging PDFs

[Back to Top](#top)
