---
layout: default
title: "Technical Specifications"
nav_order: 4
has_children: true
permalink: /docs/techSpecs
---

# Technical Specifications
{: .no_toc}

## Table of Contents 
{: .no_toc}

1. TOC
{:toc}

## Applications Used

This project utilizes five main pieces of software: 

1. [Plumsail Forms](https://plumsail.com/docs/forms-web/index.html): Plumsail forms is the interface of this project: It is what subcontractors and TCE employees interact with.
2. [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript): JavaScript controls the form to make it interactive and dynamically respond to user input.
3. [Power Automate](https://learn.microsoft.com/en-us/power-automate/): Power Automate runs the backend, from merging PDFs to processing submitted data.
4. [Jekyll/GitHub Pages](https://pages.github.com/): GitHub pages hosts the documentation through the repository and is processed using Jekyll and the [just-the-docs] theme.
5. [Python](https://www.python.org/): Python is used to generate the JSON file that contains the correction items. It pulls that data from the /plumsail/ folder and inserts it into the /data/ folder.

## Getting Started

Full documentation of Plumsail Forms can be found here: https://plumsail.com/docs/forms-sp/index.html

Basic editing is covered in brief at this link by Plumsail: https://plumsail.com/docs/forms-web/design.html. 

Plumsail Forms' free plan allows only 100 submissions per month, reset on the 1st of each month. We believe this should be plenty for the rate that TCE recieves these forms. However, more submissions can be brought.

[Back to Top](#top)

## Process Flow

![Process Flow Chart: from start to finish]({{ site.baseurl }}/assets/images/processFlowchart/processFlowchart.png)

This is a flowchart that describes the subcontractor process from initialization to correction. It is broken down into the power automate flows and Plumsail/JavaScript sections. Between the sections, the interaction is described. 

### Initialization

![Initialization portion of the flowchart]({{ site.baseurl }}/assets/images/processFlowchart/initialization.jpg)

When the [initialization form] is filled out, the above process occurs. There is no preprocessing before TCE fills out this form, except for including the "federally funded" question. 

### Subcontractor Form 

The large amount of preprocessing here results in the form being autofilled and changed based on user input. The flow boxes are not directly related to the functions they reference, rather the flow diagram outlines the general idea that the JavaScript acomplishes.

![Subcontractor Form Portion of the flowchart]({{ site.baseurl }}/assets/images/processFlowchart/subcontractorLoading.jpg)
*This shows the internal javascript process that takes place when the subcontractor form is loaded*

![Subcontractor submit portion of the flowchart]({{ site.baseurl }}/assets/images/processFlowchart/subcontractorSubmit.jpg)
*This shows the internal javascript process that takes place when the subcontractor clicks "submit" on the form*

### Correction

![Correction flow of the built process]({{ site.baseurl }}/assets/images/processFlowchart/correction.jpg)

*This shows the internal javascript and power automate process that takes place when the contractor needs to correct items that the subcontractor has messed up*

## Register/Login

To make edits or make a new form, a Plumsail account must be created. Currently, this is being managed by the Microsoft login email TCIG@tcelect.net. The password is _________. Log in at https://account.plumsail.com/

{: .note}
> Note: If you want to make your own account to play around with, Plumsail has instructions on how to do so here: https://plumsail.com/docs/forms-web/design.html#register-a-plumsail-account 

Click on Forms to access all forms you have in the Plumsail account. In our case, we are mostly interested in the Subcontractor Forms, but you can create a new form if you need to make a form for another purpose. 

[Back to Top](#top)

## Basic Form Editing

Add elements by clicking and dragging them in from the side. There are a few categories of elements:
- [Containers](https://plumsail.com/docs/forms-web/designer/containers/index.html): Used to organize location of other elements
- [Fields](https://plumsail.com/docs/forms-web/designer/fields/index.html): Basic inputs for user to input information
- [Controls](https://plumsail.com/docs/forms-web/designer/controls/index.html): Text and Dynamic elements such as a submit button, Captcha, and ink sketch

Properties of elements are listed on the right side of the window, which can be edited for your needs. For example, if you want a field for an email, click and drag a new “Text” field to where you need it to go. On the right, you can then specify the format to be an email. 

![]({{ site.baseurl }}/assets/images/plumsail/plumsail.png)

Aside: You will notice that the pattern will update accordingly when you specify a particular format for a “Text” field. That strange expression is called Regex and is a way to represent a series of characters, also known as a string. It allows you to specify the exact format of strings. You can learn more at Regular expressions - JavaScript | MDN (mozilla.org) and play around with it using this link: https://regex101.com/ 

----

[just-the-docs]: https://just-the-docs.github.io/just-the-docs/

[initialization form]: https://tce-innovation.github.io/Subcontractor-Automation/forms/initialization.html

[Back to Top](#top)