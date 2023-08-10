---
title: Conventions
layout: page
nav_order: 1
parent: Technical Specifications
---

# Table of Contents
{:toc}

# Conventions

##Sharepoint File Storage

All files are stored in a designated SharePoint folder. They are organized by contract number, then subcontractor name, then the time that the form was submitted. If the document is a Word Document, then it will be placed in a folder called `Individual Word Documents`. If the document is not a merged document, then it will be placed in a folder called `Individual PDFs`. Otherwise, merged PDFs will be placed in the timestamped folder. 

Path format: 

```
.../<contractNumber>/<subcontractorName>/<timestamp>/[<Individual Word Documents>|<Individual PDFs>]
```

Example paths: 

```
.../T-00001/Case2SQS/2023_08_09_10_51_25/Individual Word Documents/
.../T-00001/Case3RMSA/2023_08_09_10_51_25/Individual PDFs/
.../R-33333/KrugerIncLLC/2023_08_02_12_11_01/
```

The individual files for each MTA-required subcontractor form are named by the order in which they appear in their respective packet, the name of the form, the contract number, subcontractor name, and finally the file extension all separated by a period. Files such as Schedule G and OCIP COI for TCE that are not merged into a packet are not given an order as they are always separate files. Thus, they can only be found in the `Individual PDFs` folder.

File name format: 

```
[<orderInPacket>.]<formName>.[<section1>.<section2>.<section3>. ...]<contractNumber>.<subcontractorName>.<fileExtension>
```
Example file names: 
```
1.0.OCIP.FAFB.T-00001.Case2SQS.pdf
5.1.SB.P3.attachment.T-00001.Case3RMSA
SG.T-00001.Case3RMSA
```

[Back to Top](#top)

##Word Template Controls and Plumsail Public Forms Fields (Plumsail Fields)

When creating form templates, it is essential that the names of Word Template Controls are unique so that the document can be populated with the correct and corresponding data. Plumsail fields must also be unique to differentiate between different data. Word Template Controls have the properties:

* `Title`:
* `Tag`:
* Default Value: the value to be populated in the template if no value is provided. This is also shown in the "Populate a Microsoft Word template" action when the field is empty and can thus be used as a helpful hint for matching fields when editing the Power Automate Flow.

Plumsail Fields have the properties:
* `Name`: the internal name used to access the particular field within the JSON object containing the form responses
* `Title`: the text to be displayed with the field
* `Class`: an optional field that can be used to enter a class name that specifies a set of characteristics 

They follow the conventions below:

* Word Template Controls properties `Title` and `Tag` will have the same value.
* The `Name` property of the Plumsail fields that are not shared across multiple Word Templates will have the same value as the `Title` and `Tag` properties of the corresponding Word Template Control Sometimes this `Name` property may be referred to in this document also as the "internal name."

[Back to Top](#top)