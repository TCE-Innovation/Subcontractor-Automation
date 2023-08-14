---
title: Editing a Microsoft Word Template
layout: default
parent: Editing Flows, Forms, and Templates
grand_parent: Technical Specifications
nav_order: 5
---

# Editing a Microsoft Word Template
{: .no_toc}

## Table of Contents
{: .no_toc}

1. TOC
{:toc}

## Setup: Enable the Developer Tab

To edit a Microsoft Word Template, you will need the Developer Tab in the ribbon. This is only available on the desktop version of Microsoft Word. If this is already enabled, you will see the Developer Tab as shown below and can move onto [Adding/Editing Content Controls](#addingediting-content-controls):

![Developer Tab Picture]({{ site.baseurl }}/assets/images/microsoftWordTemplate/DeveloperTab.png)

If it does not appear, go to Word Options in one of two ways:
1. Right click on the ribbon and click on "Customize Ribbon" or...
2. Click on File at the top left, and then go to Options at the bottom on the left. If you do not see options, you need to click on "More..." first.

Next, check the Developer box in the right column and click "OK". You may have to scroll down to find it.

![Check the Developer Box]({{ site.baseurl }}/assets/images/microsoftWordTemplate/CheckDeveloperBox.png)

[Back to top](#top)

## Adding/Editing Content Controls
Word Template Content Controls include the following properties:

* `Title`: text used to describe the content control it belongs to
* `Tag`: a unique identifier for the content control it belongs to

To maintain consistency for easier maintainability in the future, when naming the `Title` and `Tag`, follow the naming conventions in [Conventions]({{ site.baseurl }}/docs/techSpecs/conventions.md). 

There are several types of Content Controls, but not all of them are supported for template population. Below are the Content Controls used in the "Process Subcontractor Form and Send PDFs" flow:

* Plain Text Content Control
* Picture Content Control 
* Repeating Section Content Control

### Plain Text Content Control

This is the most common content control that you will use. It is used for whenever you need to add a text field, dates, single choice buttons, and checkboxes. 

{: .note} 
> As of 8/14/23, the "Populate a Word template" action in Power Flow Automate and Word do not support automatic population of checkboxes, radio buttons, or date pickers. While there are content controls specifically for these fields, we cannot use them for autopopulation. If you need to add any of the above, you must add a Plain Text Content Control for each field. See [Adding Radio Buttons or Checkboxes](#adding-radio-buttons-and-checkboxes) for help specific to radio buttons and checkboxes.

1. Click on the location that you would like to add the control. If you are having trouble selecting the location you need to add the control, see [Manipulating the Location of a Content Control](#manipulating-the-location-of-a-content-control).

2. If you only want to edit a control, skip to Step 3. Otherwise, go to the Developer Tab and click on the Plain Text Content Control button. 

![Plain Text Content Control]({{ site.baseurl }}/assets/images/microsoftWordTemplate/plainTextContentControlBtn.png)

3. With your cursor inside the Plain Text Content Control of choice, click on "Properties" to edit the `Title` and `Tag`. 

![Properties Button]({{ site.baseurl }}/assets/images/microsoftWordTemplate/propertiesBtn.png)

4. Fill in any of the other properties as necessary. 

In addition to the `Title` and `Tag`, Plain Text Content Controls have a few other properties. The ones of interest are:

* Default Value: the value to be populated in the template if no value is provided. This is helpful for matching values when editing the "Populate a Word Template" actions in Power Automate. In the picture below, "Name of Signer" is the default text. 
{: .note}
> In Step 1, you can also highlight the text where you want to make the control. The text you highlight will become the Default Text of the Plain Text Content Control. 

![Default Value](/assets/images/microsoftWordTemplate/defaultText.png)

* Allow carriage returns (multiple paragraphs): allows newline characters to be entered in the content control. Useful if you anticipate that text needs to wrap onto another line. 

![Plain Text Content Control Properties]({{ site.baseurl }}/assets/images/microsoftWordTemplate/plainTextContentControlProperties.png)

### Picture Content Control

1. Click on the location that you would like to add the control. If you are having trouble selecting the location you need to add the control, see [Manipulating the Location of a Conent Control](#manipulating-the-location-of-a-content-control).

2. If you only want to edit a control, skip to Step 3. Otherwise, go to the Developer Tab and click on the Plain Text Content Control button. 

![Plain Text Content Control]({{ site.baseurl }}/assets/images/microsoftWordTemplate/plainTextContentControlBtn.png)

2. With your cursor inside the Plain Text Content Control of choice, click on "Properties" to edit the `Title` and `Tag`. 

![Properties Button]({{ site.baseurl }}/assets/images/microsoftWordTemplate/propertiesBtn.png)

3. Fill in any of the other properties as necessary.

### Repeating Content Control

### Special Cases

#### Manipulating the Location of a Content Control

Sometimes you will encounter a situation where you want to place a content control in a particular place but simply clicking on that location is not enough. For example:

* Placing a control inline with the text will cause content afterwards to shift, ruining the format of the document
* You want the content to overlap other content such as if the form is an image and you cannot select a line

A simple way to get around these problems is to use textboxes and position them exactly where you need your content control to go. 

1. Click Draw Text box.

2. Click and hold until you have the size of textbox that you need. Alternatively, you can just click and resize later. 

3. Click within the textbox and add your content control as indicated in [Adding/Editing Content Controls](#addingediting-content-controls).

4. Go to "Shape Format" in the Word ribbon to change the shape fill and shape border. If you want no border and no fill, select the "No color" options for each. 

5. If you need to adjust the position of your text box again, move your cursor to the edge of the textbox until it changes into the move symbol. At this point, click and drag the box to wherever you need to. 

6. If you need to resize your text box, move your cursor to the edge of the textbox over any of the corner or center dots. At this point, click and drag to resize the box to whatever you need. 

#### Adding Radio Buttons and Checkboxes

As of 8/14/23, the ["Populate a Word template" action in Power Flow Automate and Word do not support automatic population of checkboxes, radio buttons, or date pickers](https://learn.microsoft.com/en-us/connectors/wordonlinebusiness/#createfileitem). Due to this limitation, we will have to add a Plain Text Content Control for every radio button or checkbox separately. Follow the same steps to add a Plain Text Content Control and follow the conventions for naming [radio buttons]({{ site.baseurl }}/docs/techSpecs/conventions.md) or [checkboxes](/docs/techSpecs/conventions.md). You may have to also follow the steps in [Manipulating the Location of a Content Control](#manipulating-the-location-of-a-control) if you want to overlay the contents of the content control over a box for example. 
