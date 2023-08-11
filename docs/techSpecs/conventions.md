---
title: Conventions
layout: page
nav_order: 1
parent: Technical Specifications
---

# Table of Contents
{:toc}

# Conventions

## Sharepoint File Storage

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

## Word Template Controls and Plumsail Public Forms Fields (Plumsail Fields)

### Description of Properties

When creating form templates, it is essential that the names of Word Template Controls are unique so that the document can be populated with the correct and corresponding data. Plumsail fields must also be unique to differentiate between different data. Word Template Controls include the following properties:

* `Title`: text used to describe the control it belongs to
* `Tag`: a unique identifier for the control it belongs to
* Default Value: the value to be populated in the template if no value is provided. This is also shown in the "Populate a Microsoft Word template" action when the field is empty and can thus be used as a helpful hint for matching fields when editing the Power Automate Flow.

Plumsail Fields have the properties:
* `Name`: the internal name used to access the particular field within the JSON object containing the form responses
* `Title`: the text to be displayed with the field to describe the field and may include instructions on how to fill the field if needed
* `Class`: an optional field that can be used to enter a class name that specifies a set of characteristics 

[Back to top](#top)

### Formatting Names and Properties

It is crucial to name the `Tag` of the Word Template control and `Name` of the Plumsail field or control to properly match and populate the correct data. Because the `Tag` and `Name` must be unique, the below conventions were followed:

* Word Template Controls properties `Title` and `Tag` will have the same value.
* The `Name` property of the Plumsail fields that are not shared across multiple Word Templates will have the same value as the `Title` and `Tag` properties of the corresponding Word Template Control Sometimes this `Name` property may be referred to as the "internal name."
* To name the `Tag` of a Word Template control, the following information is to be determined:
    * The type of field or control type of the corresponding Plumsail field
        Plumsail Field/Control types are abbreviated as the following:

        Field/Control   | Type              | Abbreviation
        ---             | ---               | ---
        Field           | Text              | t
        Field           | Note              | n
        Field           | Number            | num
        Field           | Toggle            | tog
        Field           | Drop Down         | dd
        Field           | Single Choice     | sc
        Field           | Multiple Choice   | mc
        Field           | Date              | d
        Field           | Date and Time     | dat
        Field           | Masked Text       | mt
        Field           | Attachments       | a
        Control         | Data Table        | dt
        Control         | Ink Sketch        | is

    * The individual form that the Word Template control belongs to:

        Form                                        | Abbreviation
        ---                                         | ---
        Statement of Qualification of Subcontractor | SQS
        Request for Material Supplier Approval      | RMSA
        Schedule F                                  | SF
        Schedule F1                                 | SF1
        Schedule A                                  | SA
        Schedule B                                  | SB
        Schedule B1                                 | SB1
        Schedule G                                  | SG
        Owner Controlled Insurance Program          | OCIP
        Certificate of Insurance                    | COI
        General Information or Summary*             | GI

        *Information in general information and summary are fields that are used across multiple forms and thus don't belong to any particular one

    * The subsection(s) that the control belongs to. Sometimes there may not be a subsection.

        Type of Subsection  | Abbreviation
        ---                 | ---
        Part                | P
        Question            | Q
        Section             | Sec
        Form                | F

    * A short description of the field
    * If there are repeated occurrences of the field or control in the same subsection, the name of the value of that field or the number of the order of occurrence of the field or control within that subsection
    * If the Word Template control is NOT within a repeating content control, or in other words not a column of a cooresponding Plumsail data table
        * The `Tag` is then named in the following way: 
        ```
        <fieldOrControlType>.<form>[.<subsection1>.<subsection2>.<subsection3> ...].<descriptionOfField>[.<numberOfRepeatedOccurrence>]
        ```
        where each of the above items are formatted in camelCase: the first word is lowercase and any subsequent words to be capitalized and appended on without a space. If any of the above items are abbreviations then all of the letters are fully capitalized for that item.
        * Otherwise it is named:
        ```
        col<fieldOrControlType><Form>[<Subsection1><Subsection2>.]
        ```
        where each of the above items are formatted in CamelCase all words are capitalized and appended without spaces.

[Back to Top](#top)

### Notes

#### Fields and Controls Only Present in the Plumsail Form

While there should always be a corresponding Plumsail Field to match to every field in the Word Template, there may be extra Plumsail fields to facilitate the completion of the forms. For example, toggles are added to hide and show PDFs and the "Are you required to fill out ..." single choice questions guide the subcontractor through filling the forms. These will not appear as Word Template controls but can still be used to format the data to be populated in them.

#### Fields and Controls Shared Across Forms

Common fields such as the name of the subcontractor and title of the person completing the form are consolidated into General Information or Summary. When naming the `Title` and `Tag` of the Word Template controls will still be specific to the form that they are in, but the `Name` of the Plumsail field/control will use `GI` as the form they belong to.

### Examples

#### Plumsail Names
```
t.SA.titleOfPersonExecutingCertification
n.SB1.1.explanation
num.SG.FB.amtOfWork.nonDBE
dd.RMSA.generalContractorState
sc.SF.FF3.4.primeOrSubawardee.prime
dt.SB.P5.K.3.MTAContractsWorkNotCompleted
mt.SF1.MTAPrimeContractNumber
d.OCIP.FA.S2.workersCompExpiration
is.SA.signatureOfAuthorizedOfficial
a.SB.P4.completeOrganizationChart
d.GI.dateSigned
coltSQS9principalContractsLocation 
colddmcSBP5MemployedBy
```

[Back to Top](#top)

####  One-to-One Match - Corresponding Word Template `Title`, `Tag`, Default Text, and Plumsail Forms `Name` 

A drop down field was used for the state field in RMSA to ensure only accepted states are possible and prevent typos. This is a field only found in RMSA.

Word Template Title and Tag: `dd.RMSA.supplier.state`

Word Template Default Text: `Supplier State`
![RMSA Example Default Text](assets/images/microsoftWordTemplate/RMSAExampleDefaultText.png)

Plumsail Forms Name: `dd.RMSA.supplier.state`
![RMSA Example Plumsail Forms Name](assets//images/plumsail/RMSAExampleName.png)

Plumsail Forms Class: no class was provided.

#### Radio Buttons and Checkbox Groups

In RMSA, there are single choice or radio "buttons" for the question of whether the proposed supplier is D/M/WBE. There are two choices: `Yes` and `No`. There is one Word Template control for each choice and only one Plumsail Field that corresponds to this group of controls.

Word Template `Title` and `Tag` of the two controls:  `sc.RMSA.isProposedSupplierDMWBE.yes` and `sc.RMSA.isProposedSupplierDMWBE.no`

![RMSA Example Single Choice](assets/images/microsoftWordTemplate/RMSATitleAndTagExampleSingleChoice.png)

Plumsail Forms Name: `sc.RMSA.isProposedSupplierDMWBE`

![RMSA Example Single Choice Plumsail Forms Name](assets/images/plumsail/RMSAExampleSingleChoice.png)

#### Fields Common Across Several Forms

The name of the person completing the form is listed on several forms including Schedule A and Schedule F.

Word Template `Title` and `Tag` in Schedule A: `t.SA.nameOfPersonExecutingCertification`
Word Template Default Text in Schedule A: `Name of Person Executing Certification`
![Schedule A Example Title and Tag for Name of Signer](assets/images/microsoftWordTemplate/SAExampleNameOfSignerDefaultText.png)

Word Template `Title` and `Tag` in Schedule F: `t.SF.FF1.nameOfAuthorizedOfficial`
Word Template Default Test in Schedule F: `Name of Authorized Official`
![Schedule F Example Title and Tag for Name of Signer](assets/images/microsoftWordTemplate/SFExampleNameOfSignerDefaultText.png)

Plumsail Forms Name: `t.GI.nameOfPersonCompletingForm`
Plumsail Forms Class: no class was provided

#### Fields Present Only in the Plumsail Form

For every individual MTA-required form except for the COI, there is a corresponding toggle field that allows the subcontractor to hide or show the PDF of the blank form. There is also a corresponding "Have you read and understood..." question. The values of these fields do not have to be shown in Word Templates so there is no corresponding Word Template control, only a Plumsail field. Below is an example of this:

Plumsail Forms Name: `tog.SB1.hidePDF`
Plumsail Forms Class: no class was provided

![Example of Schedule B1 Toggle](assets/images/plumsail/SB1ExampleToggle.png)

#### Plumsail Fields with Classes and Conditional Attachments

In Schedule B1, an attachment may be required, but not all the time. Thus, `SB1Required` is added as a class to the Plumsail Forms field to allow JavaScript to identify which fields should be shown. See the documentation on JavaScript for more information. As this is an attachment, there is also no corresponding Word Template control.

Plumsail Forms Name: `sc.SB1.1.attachment`
Plumsail Forms Class: `SB1Required`

![Example of Schedule B1 Conditional Attachment](assets/images/plumsail/SB1ExampleConditionalAttachment.png)

[Back to Top](#top)